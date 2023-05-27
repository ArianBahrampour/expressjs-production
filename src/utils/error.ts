import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import httpStatus from "http-status";

import logger from "./logger";

class ApiError extends Error {
    statusCode: number;

    isOperational: boolean;

    override stack?: string;

    constructor(statusCode: number, message: string, isOperational = true, stack = "") {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export const errorConverter = (err: any, _req: Request, _res: Response, next: NextFunction) => {
    let error = err;
    if (!(error instanceof ApiError)) {
        const statusCode =
            error.statusCode || error instanceof mongoose.Error
                ? httpStatus.BAD_REQUEST
                : httpStatus.INTERNAL_SERVER_ERROR;
        const message: string = error.message || `${httpStatus[statusCode]}`;
        error = new ApiError(statusCode, message, false, err.stack);
    }
    next(error);
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err: ApiError, _req: Request, res: Response, _next: NextFunction) => {
    let { statusCode, message } = err;
    if (!err.isOperational) {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        message = "Internal Server Error";
    }

    res.locals["errorMessage"] = err.message;

    const response = {
        code: statusCode,
        message,
    };

    logger.error(err);

    res.status(statusCode).send(response);
};

export default {
    errorConverter,
    errorHandler,
};

export { ApiError };

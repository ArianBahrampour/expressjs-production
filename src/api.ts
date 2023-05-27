import express from "express";
import { PORT, DBURL, CORS_ORIGINS } from "./config";
import cors from "cors";
import xss from "xss-clean";
import helmet from "helmet";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { router as favoriteRouter } from "./routes/favorite.router";
import { router as profileRouter } from "./routes/profile.router";
import { router as simulatorRouter } from "./routes/simulator.router";
import morgan from "./utils/morgan";
import ExpressMongoSanitize from "express-mongo-sanitize";

import httpStatus from "http-status";
import { ApiError, errorConverter, errorHandler } from "./utils/error";

mongoose.connect(`${DBURL}`, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log(`Connected to DB ${DBURL}`);
});

const app = express();
app.use(cors({ origin: CORS_ORIGINS }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());

// Sanitize
app.use(xss());
app.use(ExpressMongoSanitize());

// Logger
app.use(morgan.successHandler);
app.use(morgan.errorHandler);

// Routes
app.use(favoriteRouter);
app.use(profileRouter);
app.use(simulatorRouter);

// Send back a 404
app.use((_req, _res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

app.use(errorConverter);

// Handle error
app.use(errorHandler);

app.listen(PORT, () => console.log(`✅  Ready on port http://localhost:${PORT}`));

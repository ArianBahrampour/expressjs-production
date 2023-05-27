import winston from "winston";

interface LoggingInfo {
    level: string;
    message: string;
}

const enumerateErrorFormat = winston.format((info: LoggingInfo) => {
    if (info instanceof Error) {
        Object.assign(info, { message: info.stack });
    }
    return info;
});

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        enumerateErrorFormat(),
        winston.format.colorize(),
        winston.format.splat(),
        winston.format.printf((info: LoggingInfo) => `${info.level}: ${info.message}`)
    ),
    transports: [
        new winston.transports.Console({
            stderrLevels: ["error"],
        }),
    ],
});

export default logger;

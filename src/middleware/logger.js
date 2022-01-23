/**
 * @purpose      To create logger
 * @module       middleware
 * @file         logger.js
 * @author       deepak
 * @since        9/1/2022
 */


const winston = require("winston");
const path = require("path");

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, "..", "logs", "error.log"),
      level: "error",
    }),
    new winston.transports.File({
      filename: path.join(__dirname, "..", "logs", "warn.log"),
      level: "warn",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
    new winston.transports.File({
      filename: path.join(__dirname, "..", "logs", "info.log"),
      level: "info",
      /* format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ), */
    }),
    new winston.transports.File({
      filename: path.join(__dirname, "..", "logs", "silly.log"),
      level: "silly",
    }),
  ],
});

module.exports = logger;

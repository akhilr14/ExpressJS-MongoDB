const winston = require("winston");

const options = {
  fileApp: {
    level: "info",
    filename: `./logs/app.log`,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
  },
  fileError: {
    level: "error",
    filename: `./logs/error.log`,
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
  },
  console: {
    level: "error",
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
  }
};

const customLogger = winston.createLogger({
  transports: [
    new winston.transports.File(options.fileApp),
    new winston.transports.File(options.fileError),
    new winston.transports.Console(options.console)
  ],
});

customLogger.stream = {
  write: function (message) {
    customLogger.info(message);
  },
};

module.exports = { customLogger };

// const {createLogger, transports, format} = require('winston');

// const customLogger = createLogger({
//     transports: [
//         new transports.File({
//             filename: './logs/Event.log',
//             level: 'info',
//             format: format.combine(
//                 format.timestamp(),format.json()
//             )
//         }),
//         new transports.File({
//             filename: './logs/Event-error.log',
//             level: 'error',
//             format: format.combine(
//                 format.timestamp(),format.json()
//             )
//         })
//     ] 
// })

// module.exports = {customLogger}
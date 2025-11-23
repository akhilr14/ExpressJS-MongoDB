const {createLogger, transports, format} = require('winston');

const customLogger = createLogger({
    transports: [
        new transports.File({
            filename: 'Event.log',
            level: 'info',
            format: format.combine(
                format.timestamp(),format.json()
            )
        }),
        new transports.File({
            filename: 'Event-error.log',
            level: 'error',
            format: format.combine(
                format.timestamp(),format.json()
            )
        })
    ] 
})

module.exports = {customLogger}
import { createLogger, format, transports } from "winston";

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(({ timestamp, level, message }) =>
            `[${timestamp}] ${level.toUpperCase()}: ${message}`
        )
    ),
    // Send output to stdout.  Container Manager will collect
    transports: [ new transports.Console() ]
})

export default logger;
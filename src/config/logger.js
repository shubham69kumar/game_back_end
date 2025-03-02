import winston from 'winston';
const loggerTransports = [];

loggerTransports.push(new winston.transports.Console({
	format: winston.format.combine(
		winston.format.simple(),
		winston.format.colorize(),
		winston.format.timestamp(),
		winston.format.prettyPrint(),
		winston.format.printf(info => {
			let out = `${info.timestamp} ${info.level}: ${info.message}`;
			if (info.meta) {
				for (const k in info.meta) {
					out = out + '\n' + k + ': ' + info.meta[k];
				}
			}
			out = out + '\n';
			return out;
		})
	)
}));
const loggerOptions = {
	level:  'debug',
	transports: loggerTransports
};
const logger = winston.createLogger(loggerOptions);

logger.on('error', (err) => {
	console.error('Error inside winston', err);
});

export default logger;
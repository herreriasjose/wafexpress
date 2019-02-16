const config = require('config');

const ENV = process.env.ENV || config.get('ENV');

const {
  createLogger, format, addColors, transports,
} = require('winston');

const {
  combine, timestamp, label, printf, colorize,
} = format;

const myFormat = printf(info => `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`);

const myCustomLevels = {
  levels: {
    danger: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4
  },
  colors: {
    danger: 'red',
    error: 'red',
    warn: 'yellow',
    info: 'blue',
    debug: 'green',
    
  },
};
const logger = createLogger({
  format: combine(colorize(), label({ label: ENV }), timestamp(), myFormat),
  levels: myCustomLevels.levels,
  transports: [new transports.Console()],
});
addColors(myCustomLevels);
module.exports = logger;

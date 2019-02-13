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
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
  },
  colors: {
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

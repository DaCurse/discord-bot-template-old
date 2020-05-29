const path = require('path');
const logger = require('../util/logger')('events');
const scanExceptOne = require('../util/scan-except-one');

/**
 * Dynamically loads all event listeners from the current directory and makes
 * the client subscribe to them.
 */
module.exports = client =>
	scanExceptOne(__dirname, __filename)
		.map(file => {
			logger.log(`Loaded event '${file}'`);
			return require(path.join(__dirname, file));
		})
		.forEach(subscribe => subscribe(client));

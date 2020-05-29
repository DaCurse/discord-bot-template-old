const appName = process.env.npm_package_name;
const createDebug = require('debug');

/**
 * Creates an object which allows logging to stdout and stderr.
 */
module.exports = name => {
	const debugName = `${appName}:${name}`;
	const log = createDebug(debugName);
	const error = createDebug(`${debugName}:error`);

	return {
		log,
		error,
	};
};

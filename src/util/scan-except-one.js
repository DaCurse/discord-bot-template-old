const fs = require('fs');
const path = require('path');

/**
 * Scans a directory for `.js` files except for a single file.
 */
module.exports = (dir, exclude) =>
	fs
		.readdirSync(dir)
		.filter(
			file =>
				fs.statSync(path.join(dir, file)).isFile() &&
				file !== path.basename(exclude) &&
				file.endsWith('.js')
		);

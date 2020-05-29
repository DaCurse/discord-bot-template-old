const path = require('path');
const { Collection } = require('discord.js');
const logger = require('./logger')('commands');
const scanExceptOne = require('../util/scan-except-one');

/**
 * Scans a directory and loads all files as commands into a collection.
 */
module.exports = (commandDirectory, indexFile) =>
	scanExceptOne(commandDirectory, indexFile).reduce((commands, file) => {
		const cmdPath = path.join(commandDirectory, file);
		// Deleting cache is required to reload commands
		delete require.cache[require.resolve(cmdPath)];
		const command = require(cmdPath);
		commands.set(command.name, command);
		logger.log(`Loaded command '${command.name}'`);
		return commands;
	}, new Collection());

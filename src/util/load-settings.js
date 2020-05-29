const { Collection } = require('discord.js');
const { Settings } = require('../db');

/**
 * Loads settings for each guild from the database
 */
module.exports = async client =>
	(client.settings = await Settings.findAll().reduce(
		(collection, setting) => collection.set(setting.guildId, setting),
		new Collection()
	));

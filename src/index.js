const discord = require('discord.js');
const logger = require('./util/logger')('client');
const db = require('./db');
const loadSettings = require('./util/load-settings');
const handleCommands = require('./commands');
const subscribeToEvents = require('./events');
const { token } = require('../config/bot.json');
const client = new discord.Client();

client.once('ready', () => logger.log(`Logged in to ${client.user.tag}.`));

db.sequelize.sync().then(async () => {
	await loadSettings(client);
	handleCommands(client);
	subscribeToEvents(client);
	client.login(token);
});

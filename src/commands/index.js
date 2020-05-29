const { Collection } = require('discord.js');
const logger = require('../util/logger')('commands');
const loadCommands = require('../util/load-commands');
const { defaultPrefix, owner } = require('../../config/bot.json');

/**
 * Message event listener that dynamically handles commands.
 * @param {Discord.Message} msg
 */
function commandHandler(msg) {
	const { client, content, author, guild, member } = msg;
	if (author.bot) return;

	// Get prefix for current server, or default prefix otherwise and see if the
	// message is a command
	let prefix = defaultPrefix;
	if (guild && client.settings.has(guild.id)) {
		prefix = client.settings.get(guild.id).prefix;
	}
	if (!content.startsWith(prefix)) return;

	// Parse the command, and load it from the command colleciton (if it exists)
	const args = content.slice(prefix.length).split(/\s+/);
	const commandName = args.shift().toLowerCase();
	const command =
		client.commands.get(commandName) ||
		client.commands.find(
			cmd => cmd.aliases && cmd.aliases.includes(commandName)
		);

	// Validating if the command should execute based on context and permissions.
	if (!command) return;
	if (command.owner && author.id !== owner) {
		return;
	}
	if (command.guild) {
		if (!guild) {
			return msg.channel.send('This command can only be run within a server.');
		}
		if (
			(command.permissions && !member.hasPermission(command.permissions)) ||
			(command.roles &&
				!command.roles.some(role => member.roles.cache.has(role)))
		) {
			return msg.reply(
				'You have insufficient permissions to run this command.'
			);
		}
	}

	// Handle cooldoowns if the command has a cooldown
	if (command.cooldown) {
		const now = Date.now();
		const timestamps = client.cooldowns.get(command.name);

		if (timestamps.has(author.id)) {
			const expirationTime = timestamps.get(author.id) + command.cooldown;

			if (now < expirationTime) {
				const timeLeft = ((expirationTime - now) / 1e3).toFixed(1);
				return msg
					.reply(
						`You need to wait ${timeLeft} more second(s) before using this command.`
					)
					.then(msg => msg.delete({ timeout: expirationTime - now }));
			}
		} else {
			timestamps.set(author.id, now);
			setTimeout(() => timestamps.delete(author.id), command.cooldown);
		}
	}

	// Run the command
	logger.log(`${author.tag} (${author.id}) executed the command '${content}'`);
	try {
		command.execute(msg, args);
	} catch (error) {
		logger.error(`Error while executing '${content}': ${error}`);
		msg.reply(
			'An uknown error has occured while trying to execute this command.'
		);
	}
}

/**
 * Dynamically loads all commands from the same directory, and sets-up dynamic
 * handling.
 */
module.exports = client => {
	client.commands = loadCommands(__dirname, __filename);
	client.cooldowns = client.commands
		.filter(cmd => cmd.cooldown)
		.mapValues(() => new Collection());
	client.on('message', commandHandler);
};

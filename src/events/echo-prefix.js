const { defaultPrefix } = require('../../config/bot.json');

// This is an example event, it return a function which takes the client object,
// and listens on a certain event on it In this case, it checks when messages
// are sent, if a message only contains a mention of the bot, the bot will echo
// back it's prefix in that server.

/**
 * Echos the bot's prefix in the current guild if the bot is mentioned.
 */
module.exports = client =>
	client.on('message', msg => {
		const { client, guild, mentions } = msg;
		if (msg.author.bot || !guild) return;

		if (
			!mentions.users.has(client.user.id) ||
			msg.content !== mentions.users.get(client.user.id).toString()
		)
			return;

		let prefix = defaultPrefix;
		if (guild && client.settings.has(guild.id)) {
			prefix = client.settings.get(guild.id).prefix;
		}
		msg.reply(`My prefix here is: \`${prefix}\`.`);
	});

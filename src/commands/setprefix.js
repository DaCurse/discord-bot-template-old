const { Settings } = require('../db');

module.exports = {
	name: 'setprefix',
	description: 'Changes the prefix in the current server.',
	guild: true,
	permissions: ['ADMINISTRATOR'],
	async execute(msg, args) {
		const { guild, client, channel } = msg;
		const newPrefix = args[0];

		const settings = client.settings.get(guild.id) || {};
		if (settings.prefix === newPrefix) {
			return channel.send(''); // TODO: Write message
		}
		client.settings.set(guild.id, { ...settings, prefix: newPrefix });
		await Settings.update(
			{ prefix: newPrefix },
			{ where: { guildId: guild.id } }
		);
		channel.send(`Prefix updated to \`${newPrefix}\`.`);
	},
};

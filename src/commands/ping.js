module.exports = {
	name: 'ping',
	description: 'Checks connection to the bot.',
	cooldown: 5000,
	execute(msg) {
		msg.channel.send(`Pong! ${Date.now() - msg.createdAt.getTime()}ms`);
	},
};

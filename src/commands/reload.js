const loadCommands = require('../util/load-commands');

module.exports = {
	name: 'reload',
	description: 'Reloads all commands.',
	owner: true,
	execute(msg) {
		msg.client.commands = loadCommands(__dirname, 'index.js');
		msg.channel.send('Reloaded all commands!');
	},
};

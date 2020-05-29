const { name } = require('./package.json');

module.exports = {
	apps: [
		{
			name,
			// This breaks on Windows: https://github.com/Unitech/pm2/issues/3657#issuecomment-482010714
			script: 'npm',
			args: 'start',
			error_file: './logs/error.log',
			out_file: './logs/out.log',
			env: { NODE_ENV: 'development', DEBUG: `${name}:*` },
			env_production: { NODE_ENV: 'production', DEBUG: `${name}:*` },
		},
	],
};

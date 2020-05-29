const { name, repository } = require('./package.json');

module.exports = {
	apps: [
		{
			name: name,
			// This breaks on Windows: https://github.com/Unitech/pm2/issues/3657#issuecomment-482010714
			script: 'npm',
			args: 'start',
			error_file: './logs/error.log',
			out_file: './logs/out.log',
			env: { NODE_ENV: 'development', DEBUG: `${name}:*` },
			env_production: { NODE_ENV: 'production', DEBUG: `${name}:*` },
		},
	],
	deploy: {
		production: {
			user: 'root',
			host: '64.227.20.96',
			ref: 'origin/master',
			repo: repository.url,
			path: '~/',
			'post-deploy':
				'npm install && pm2 startOrRestart ecosystem.config.js --env production',
		},
	},
};

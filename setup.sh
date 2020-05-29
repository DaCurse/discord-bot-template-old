if [ ! -d "logs" ]; then
	mkdir logs
	touch logs/out.log
	touch logs/error.log
fi
rm -rf node_modules
npm i
pm2 startOrRestart ecosystem.config.js
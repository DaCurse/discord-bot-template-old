/**
 * Sequelize database config
 */
const path = require('path');
const logger = require('../src/util/logger')('db');

module.exports = {
	dialect: 'sqlite',
	storage: path.join(__dirname, '..', 'data.sqlite'),
	logging: msg => logger.log(msg),
};

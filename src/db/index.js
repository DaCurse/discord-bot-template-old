/**
 * Dynamically loads all Sequelize models within the same directory.
 */
const path = require('path');
const scanExceptOne = require('../util/scan-except-one');
const Sequelize = require('sequelize');
const config = require('../../config/db');
const sequelize = new Sequelize(config);
const db = {};

scanExceptOne(__dirname, __filename).forEach(file => {
	const model = sequelize.import(path.join(__dirname, file));
	db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
module.exports = db;

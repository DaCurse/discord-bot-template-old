module.exports = (sequelize, DataTypes) =>
	sequelize.define(
		'Settings',
		{
			guildId: {
				type: DataTypes.STRING,
				primaryKey: true,
			},
			prefix: {
				type: DataTypes.STRING,
			},
		},
		{ timestamps: false }
	);

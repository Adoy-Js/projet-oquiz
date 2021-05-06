const { Sequelize } = require('sequelize');

// On créé l'instance de la BDD
const sequelize = new Sequelize(process.env.PG_URL);

// Et on l'export
module.exports = sequelize;


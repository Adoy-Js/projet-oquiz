const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');

class User extends Model {}

User.init({
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstname: {
    type: DataTypes.STRING,
  },
  lastname: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.STRING,
  },
}, {
  // Autre options du modeles
  sequelize, // On a besoin de donner l'instance de la connexion
  timestamps: false, // Pour ne pas avoir les champs createdAt et updatedAt
  tableName: 'user' // Pour imposer un nom de table, sinon il prend le model au pluriel par défaut
});

// Puis on export pour pouvoir le require là ou on va l'instancier
module.exports = User;
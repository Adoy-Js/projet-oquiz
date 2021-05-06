const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');

class Quiz extends Model {}

Quiz.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
}, {
  // Autre options du modeles
  sequelize, // On a besoin de donner l'instance de la connexion
  timestamps: false, // Pour ne pas avoir les champs createdAt et updatedAt
  tableName: 'quiz' // Pour imposer un nom de table, sinon il prend le model au pluriel par défaut
});

// Puis on export pour pouvoir le require là ou on va l'instancier
module.exports = Quiz;
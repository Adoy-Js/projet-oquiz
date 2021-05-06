const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');

class Question extends Model {}

Question.init({
  question: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  anecdote: {
    type: DataTypes.STRING,
  },
  wiki: {
    type: DataTypes.STRING,
  },
}, {
  // Autre options du modeles
  sequelize, // On a besoin de donner l'instance de la connexion
  timestamps: false, // Pour ne pas avoir les champs createdAt et updatedAt
  tableName: 'question' // Pour imposer un nom de table, sinon il prend le model au pluriel par défaut
});

// Puis on export pour pouvoir le require là ou on va l'instancier
module.exports = Question;
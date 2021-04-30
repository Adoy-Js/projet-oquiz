const dotenv = require('dotenv');
dotenv.config();
const sequelize = require('./database');

const Answer = require('./models/Answer');

// On test la connexion à la BDD
sequelize.authenticate()
  // Si c'est connecté on passe dans le then
  .then(() => {
    console.log('Connection has been established successfully.');

    Answer.findOne()
      .then((answer) => {
        console.log("Answer :", answer.description)
      });
  })
  // Si y'a eu une erreur quelle qu'elle soit, on passe dans le catch
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });



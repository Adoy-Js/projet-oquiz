const dotenv = require('dotenv');
dotenv.config();
const sequelize = require('./database');

const Level = require('./models/Level');

// On test la connexion à la BDD
sequelize.authenticate()
  // Si c'est connecté on passe dans le then
  .then(() => {
    console.log('Connection has been established successfully.');

    Level.findAll()
      .then((level) => {
        console.log("Level :", level)
      });
  })
  // Si y'a eu une erreur quelle qu'elle soit, on passe dans le catch
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });



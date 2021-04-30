const dotenv = require('dotenv');
dotenv.config();
const sequelize = require('./database');

const Question = require('./models/Question');

// Récupération de la liste de toutes les questions
Question.findAll()
// Si ça s'est bien passé, j'ai donc mes questions
.then((questions) => {
  console.log("Toutes mes questions", questions);
})
// Si ça s'est pas bien passé pour n'importe quelle raison
// alors je passe dans le catch
.catch((error) => {
  console.error("Erreur capturée", {
    name: error.name, 
    message: error.message
  });
})

// Récupération du Tag qui a pour id 2 --> Go RTFM
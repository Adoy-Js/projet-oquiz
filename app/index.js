const dotenv = require('dotenv');
dotenv.config();
const sequelize = require('./database');

const Question = require('./models/Question');
const Tag = require('./models/Tag');

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
// cf https://sequelize.org/master/manual/model-querying-finders.html
Tag.findByPk(2)
// Si ça s'est bien passé, j'ai donc mon Tag qui a pour id 2
.then((tag) => {
  console.log("Mon tag recherché", tag);
})
// Si ça s'est pas bien passé pour n'importe quelle raison
// alors je passe dans le catch
.catch((error) => {
  console.error("Erreur capturée", {
    name: error.name, 
    message: error.message
  });
});
const dotenv = require('dotenv');
dotenv.config();
const sequelize = require('./database');

// Ici le require n'a que le nom du dossier
// Si je ne précise pas le nom du fichier, il va tout seul
// tenter de récupérer le fichier index.js à l'interrieur du dossier
const { User, Quiz, Tag, Question } = require('./models');

/*
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
*/

//************* Test des relations **************/

// https://sequelize.org/master/manual/eager-loading.html#including-everything
// Récupération d'un utilisateur ainsi que de ses quizzes
User.findOne({ include: {// Je veux include l'association quizzes
  association: 'quizzes',// Mais dans cette association je veux aussi les tags ET les questions
  include: ['tags', {
    association: 'questions',// Mais dans les questions je veux aussi pour chaque question la bonne réponse associée
    include: 'good_answer'
  }]
}}) // On utilise l'alias qu'on avait donné à la relation
.then((user) => {
  console.log(
    "La réponse à la première question, du premier quiz du premier utilisateur trouvé",
    user.quizzes[0].questions[0].good_answer.description
  );
});
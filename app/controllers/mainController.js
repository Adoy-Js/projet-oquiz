const { localsName } = require('ejs');
const { Quiz } = require('../models')

const mainController = {
  indexAction: (req, res, next) => {
    // On récupère la liste de quizzes
    Quiz.findAll({
      include: 'user' // On ajoute la relation user dedans pour avoir l'utilisateur rattaché à chaque quiz
    }).then((quizzes) => {
      // Maintenant qu'on a les quizzes, on renvoie la vue avec les quizzes dedans
      res.render('index', {
        quizzes
      })
    }).catch((error) => {
      // On laisse le middleware d'erreur gérer l'erreur
      next(error);
    });
    // Peut aussi s'écrire
    // .catch(next);
  },
  profilePage: (req, res, next) => {
    res.render('profile');
  },
  adminPage: (req, res, next) => {
    res.render('admin');
  }
}

module.exports = mainController;
const { Quiz } = require('../models');

const quizController = {
  detailAction: (req, res) => {
    // Récupération de l'id du quiz
    const quizId = req.params.id;

    Quiz.findByPk(quizId, {
      include: [
        'user',
        'tags',
        { // J'ai besoin de questions mais avec plus de détail
          // Je précise donc la relation
          association: 'questions',
          // et je rajoute ce dont j'ai besoin dans CETTE relation
          include: ['answers', 'level']
        }
      ]
    }).then((quiz) => {
      // On envoie le quiz directement dans le détail
      res.render('quiz', quiz.dataValues);
    });
  }
}

module.exports = quizController;
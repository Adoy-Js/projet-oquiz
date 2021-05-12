<<<<<<< HEAD
const { Error } = require("sequelize");
const { Quiz, Answer, Question } = require("../models");

const quizController = {
  detailAction: async (req, res) => {
    // Récupération de l'id du quiz
    const quizId = req.params.id;

    try {
      const quiz = await Quiz.findByPk(quizId, {
        include: [
          "user",
          "tags",
          {
            // J'ai besoin de questions mais avec plus de détail
            // Je précise donc la relation
            association: "questions",
            // et je rajoute ce dont j'ai besoin dans CETTE relation
            include: ["answers", "level"],
          },
        ],
      });

      if (!quiz) {
        throw new Error("Le quiz n'existe pas");
      }

      if (req.session.userConnected) {
        res.render("play_quiz", quiz.dataValues);
      } else {
        res.render("quiz", quiz.dataValues);
      }
    } catch (error) {
      res.render("quiz", {
        error: error.message,
      });
    }
  },

  playAction: async (req, res, next) => {
    // je commence avec un score de 0
    let score = 0;

    // je recupère le quiz
    const quizId = req.params.id;
    const quiz = await Quiz.findByPk(quizId, {
      include: { all: true, nested: true },
    });
    // je récupère les valeurs du formulaire (il s'agit donc des reponses de l'utilisateur)
    const userResponses = req.body;

    // je verifie pour chaque question
    for (const question of quiz.questions) {
     
      // que la reponse associée
      // Exemple pour récupérer la reponse du formulaire pour la question 58 on écrit :
      // on peut acceder à une propriété d'un objet un peu comme on accede à l'index d'un tableau grâce aux []
      // userResponses["response_58"]
      // le 10 en 2eme parametre c'est la base (ou radix) pour dire que ce sont des ,nombre décimaux que l'on veut convertir de string vers int
      const userResponseId = parseInt(
        userResponses[`${question.id}`],
        10
      );

      // correspond à la bonne reponse à la question
      const questionResponseId = question.good_answer.id;

      console.log(userResponseId, questionResponseId)

      if (userResponseId === questionResponseId) {
        // si oui alors on rajoute un point
        score++;
      }
    }

    res.send(`Vous avez obtenu ${score} points`);
  },
};

module.exports = quizController;
=======
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
>>>>>>> 66101c0496ccc58ce332a1601f2f848fb5a125b0

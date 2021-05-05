const {
  Quiz
} = require("../models");

const quizController = {
  detailAction: async (req, res) => {
    // Récupération de l'id du quiz
    const quizId = req.params.id;

    try {
      const quiz = await Quiz.findByPk(quizId, {
        include: ["user", "tags",
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
        throw new Error('Le quiz n\'existe pas');
      }

      res.render("quiz", quiz.dataValues);

    } catch(error) {
      res.render('quiz', {
        error: error.message,
      });
    }

  },
};

module.exports = quizController;
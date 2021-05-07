const { Error } = require("sequelize");
const { Quiz, Answer, Question } = require("../models");

const quizController = {
  detailAction: async (req, res) => {
    // Récupération de l'id du quiz
    const quizId = req.params.id;

    if (res.locals.userConnected) {
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

        res.render("play_quiz", quiz.dataValues);
      } catch (error) {
        res.render("quiz", {
          error: error.message,
        });
      }
    } else {
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

        res.render("quiz", quiz.dataValues);
      } catch (error) {
        res.render("quiz", {
          error: error.message,
        });
      }
    }
  },

  playAction: async (req, res, next) => {

    let resultcompteur = 0;


    console.log(req.body);

    for (let answer in req.body) {
      try {
        const question = await Question.findOne({
          where: { id : Number(answer) },
        });
        const dataAnswer = await Answer.findOne({
          where: { id : question.answer_id },
        });
        goodAnswer = dataAnswer.dataValues.description;
        if(req.body[answer] == goodAnswer){
          
          resultcompteur++
        }
      } catch (error) {
        next(error);
      }
    }
    res.render('resultQuiz', {
      resultat : resultcompteur
    })
  },

};

module.exports = quizController;

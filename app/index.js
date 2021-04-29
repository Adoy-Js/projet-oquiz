const dotenv = require('dotenv');
dotenv.config();

const Question = require('./models/Question');
const Level = require('./models/Level');
const Quiz = require('./models/Quiz');

/* Question.findAll((err, questions) => {
  if (err) {
    console.error('Error findAll Questions', err);
  }
  console.log('Questions : ', questions);
});

Quiz.findAll((err, quizzes) => {
  if (err) {
    console.error('Error findAll Quizzes', err);
  }
  console.log('Quiz : ', quizzes);
}); */

Question.findOne(1, (err, question) => {
  if (err) {
    console.error('Error findOne Question', err);
  }
  console.log('Question : ', question);
});

Quiz.findOne(1, (err, quiz) => {
  if (err) {
    console.error('Error findOne Quiz', err);
  }
  console.log('Quiz : ', quiz);
});
// const newQuestion = new Question({});
// newQuestion.create();
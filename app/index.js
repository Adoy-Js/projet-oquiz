const dotenv = require('dotenv');
dotenv.config();

const Question = require('./models/Question');
const Level = require('./models/Level');
const Quiz = require('./models/Quiz');

Question.findAll((err, questions) => {
  if (err) {
    console.error('Error findAll Questions', err);
  }
  console.log('Questions : ', questions);
});

Quiz.findAll((err, quiz) => {
  if (err) {
    console.error('Error findAll Quiz', err);
  }
  console.log('Quiz : ', quiz);
});

// const newQuestion = new Question({});
// newQuestion.create();
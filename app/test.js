const Answer = require('./models/Answer');
const Question = require('./models/Question');
const User = require('./models/User');


const maReponse = new Answer({
  id: 1,
  description: 'Ma description',
  question_id: 2
});

console.log('MaRéponse : ', maReponse);

const userObj = {
  id: 1,
  email: 'superman@hero.com',
  password: 'jesuisclarkkent',
  firstname: 'Clark',
  lastname: 'Kent',
};

const monUser = new User(userObj);

console.log('Mon Utilisateur BEFORE : ', monUser);
monUser.fullName = 'Bruce Wayne';
console.log('Mon Utilisateur AFTER : ', monUser.fullName);

const maQuestion = new Question({
  id: 1,
  question: "Quel le muscle ?",
  anecdote: "Il est rose",
  wiki: null,
  level_id: 1,
  answer_id: 1,
  quiz_id: 1
});

console.log(maQuestion);
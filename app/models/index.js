const User = require('./User');
const Quiz = require('./Quiz');
const Tag = require('./Tag');
const Question = require('./Question');
const Answer = require('./Answer');
const Level = require('./Level');

// User et Quiz
// One-To-Many relation : the hasMany and belongsTo associations are used together
// On commence par le hasMany
User.hasMany(Quiz, {
  foreignKey: 'user_id',
  as: 'quizzes', // On nomme notre relation ( on lui donne un alias )
})
// Puis la réciproque : le belongsTo
Quiz.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user', // On nomme notre relation ( on lui donne un alias 
})

// Quiz et Question
// One-To-Many relation : the hasMany and belongsTo associations are used together
// On commence par le hasMany
Quiz.hasMany(Question, {
  foreignKey: 'quiz_id',
  as: 'questions', // On nomme notre relation ( on lui donne un alias )
})
// Puis la réciproque : le belongsTo
Question.belongsTo(Quiz, {
  foreignKey: 'quiz_id',
  as: 'quiz', // On nomme notre relation ( on lui donne un alias 
})

// Quiz et Tag
// Many-To-Many relation : two belongsToMany calls are used together
// C'est partit pour le premier
Quiz.belongsToMany(Tag, {
  through: 'quiz_has_tag', // A travers la table de correspondance quiz_has_tag
  foreignKey: 'quiz_id', // La clef étrangère du quiz
  otherKey: 'tag_id', // Et l'autre clef
  as: 'tags', // On nomme notre relation ( on lui donne un alias )
  timestamps: false,
});

// Puis le second
Tag.belongsToMany(Quiz, {
  through: 'quiz_has_tag', // A travers la table de correspondance quiz_has_tag
  foreignKey: 'tag_id',// La clef étrangère du tag
  otherKey: 'quiz_id', // Et l'autre clef
  as: 'quizzes', // On nomme notre relation ( on lui donne un alias )
  timestamps: false,
});

// Question <> Answer
// 2 relation possible pour ces 2 entités, on va parler de la première
// a savoir VALIDER dont une ONE-TO-ONE
// TOne-To-One relationship, the hasOne and belongsTo associations are used together;
Question.belongsTo(Answer, {
  foreignKey: 'answer_id',
  as: 'good_answer'
});
// Donc la réciproque
Answer.hasOne(Question, {
  foreignKey: 'answer_id',
  as: 'question_answered'
});

// Question <> Answer
// Deuxième relation plus simple
// One-To-Many relationship, the hasMany and belongsTo associations are used together;
// une question a des réponses
// et une réponse dépend d'une question
Question.hasMany(Answer, {
  foreignKey: 'question_id',
  as: 'answers'
})
// La réciproque
Answer.belongsTo(Question, {
  foreignKey: 'question_id',
  as: 'question'
})


// Question <> Level
// One-To-Many relationship, the hasMany and belongsTo associations are used together;
// un niveau a plein de questions
// et une question dépend d'un niveau
Level.hasMany(Question, {
  foreignKey: 'level_id',
  as: 'questions'
});
// La réciproque
Question.belongsTo(Level, {
  foreignKey: 'level_id',
  as: 'level'
});

module.exports = {
  User, Quiz, Tag, Question, Answer, Level
}
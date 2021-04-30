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


module.exports = {
  User, Quiz, Tag, Question, Answer, Level
}
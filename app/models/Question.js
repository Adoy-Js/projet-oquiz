const CoreModel = require('./CoreModel')

class Question extends CoreModel{
  _question;
  _anecdote;
  _wiki;
  _level_id;
  _answer_id;
  _quiz_id;

  constructor(obj){
    super(obj);
    this.question = obj.question;
    this.anecdote = obj.anecdote;
    this.wiki = obj.wiki;
    this.level_id = obj.level_id;
    this.answer_id = obj.answer_id;
    this.quiz_id = obj.quiz_id;
  }


  get question() {
    return this._question;
  }

  set question(question){
    this._question = question;
  }
  get anecdote() {
    return this._anecdote;
  }

  set anecdote(anecdote){
    this._anecdote = anecdote;
  }
  get wiki() {
    return this._wiki;
  }

  set wiki(wiki){
    this._wiki = wiki;
  }
  get level_id() {
    return this._level_id;
  }

  set level_id(level_id){
    this._level_id = level_id;
  }
  get answer_id() {
    return this._answer_id;
  }

  set answer_id(answer_id){
    this._answer_id = answer_id;
  }
  get quiz_id() {
    return this._quiz_id;
  }

  set quiz_id(quiz_id){
    this._quiz_id = quiz_id;
  }
}

module.exports = Question;
const CoreModel = require('./CoreModel');

class Quiz extends CoreModel {

  static tableName = 'quiz';
  
  _title;
  _description;
  _user_id;

  constructor(obj){
    super(obj);
    this.title = obj.title;
    this.description = obj.description;
    this.user_id = obj.user_id;
  }

  get title() {
    return this._title;
  }

  set title(title) {
    this._title = title;
  }

  get description() {
    return this._description;
  }

  set description(description) {
    this._description = description;
  }

  get user_id() {
    return this._user_id;
  }

  set user_id(user_id) {
    this._user_id = user_id;
  }

}

module.exports = Quiz;
const CoreModel = require('./CoreModel');

class Answer extends CoreModel {

  static tableName = 'answer';

  _description;
  _question_id;

  // Création du constructor pour initialiser les données
  constructor(obj) {
    super(obj);
    this.description = obj.description;
    this.question_id = obj.question_id;
  }

  // Setter / Getter de description

  set description(description) {
    this._description = description;
  }

  get description() {
    return this._description;
  }

  // Setter / Getter de question_id

  set question_id(question_id) {
    if (isNaN(parseInt(question_id, 10))){
      throw new Error('Id must be an integer');
    }
    this._question_id = parseInt(question_id, 10);
  }

  get question_id() {
    return this._question_id;
  }
}

// Puis on export pour pouvoir le require là ou on va l'instancier
module.exports = Answer;
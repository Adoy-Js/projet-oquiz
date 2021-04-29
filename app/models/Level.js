const CoreModel = require('./CoreModel');

class Level extends CoreModel {

  static tableName = "level";

  _name;

  constructor(obj){
    super(obj);
    this.name = obj.name;
  }

  set name(name) {
    this._name = name;
  }
  
  get name() {
    return this._name;
  }

}

module.exports = Level;
const CoreModel = require('./CoreModel');

class Level extends CoreModel {
  _name;

  constructor(obj){
    super(obj);
    this._name = obj.name;
  }

  set name(name) {
    this._name = name;
  }
  
  get name() {
    return this._name;
  }
}

module.exports = Level;
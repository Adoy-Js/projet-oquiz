const CoreModel = require('./CoreModel');
const database = require('../database');

class Tag extends CoreModel {
  
  static tableName = 'tag';

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

module.exports = Tag;
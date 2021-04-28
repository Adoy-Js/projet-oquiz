class CoreModel {
  _id;

  constructor(obj){
    this.id = obj.id;
  }

  // Setter / Getter de id
  set id(id) {
    if (isNaN(parseInt(id, 10))){
      throw new Error('Id must be an integer');
    }
    this._id = parseInt(id, 10);
  }

  get id() {
    return this._id;
  }
}

module.exports = CoreModel;
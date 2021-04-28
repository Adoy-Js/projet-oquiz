class CoreModel {
  _id = null;

  constructor(obj) {
    this.id = obj.id;
  }

  // Setter / Getter de id
  set id(id) {
    // Si l'id vaut quelque chose
    if (id) {
      // Alors on vérifie son intégrité
      if (isNaN(parseInt(id, 10))) {
        // Si c'est pas bon on fait planter
        throw new Error('Id must be an integer');
      }
      // Si c'est bon le set
      this._id = parseInt(id, 10);
    }
    // Si jamais l'id ne vaut rien
    else {
      // On impose l'id à null
      this._id = null;
    }
  }

  get id() {
    return this._id;
  }
}

module.exports = CoreModel;
const CoreModel = require('./CoreModel');
const database = require('../database');

class Tag extends CoreModel {
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

  static findAll(callback) {
    const query = {
      text: `SELECT * FROM "tag";`,
    }

    database.query(query, (err, result) => {
      if (err){
        return callback(err, null);
      }
      const rows = result.rows;
      
      // On parcour toutes les lignes retournées par PG
      // Et pour chaque ligne, on va créer une instance de Tag
      // Puis retourner cette instance pour qu'elle aille se stocker
      // dans le nouveau tableau tags
      const tags = rows.map((row) => {
        return new Tag(row);
      })

      // On peut même l'écrire en une ligne
      // const tags = rows.map((row) => new Tag(row));
      return callback(null, tags);
    });
  }
}

module.exports = Tag;
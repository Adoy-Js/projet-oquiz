const database = require('../database');

class CoreModel {
  _id = null;

  // Il va nous falloir une variable statique tableName
  // pour faire nos requêtes SQL
  static tableName;

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

  static findAll(callback) {
    const query = {
      text: `SELECT * FROM "${this.tableName}"`
    }

    // Puis on l'execute
    database.query(query, (err, result) => {
      // Si j'ai une erreur on stop et on déclenche le callback
      // avec l'erreur
      if (err) {
        return callback(err, null);
      }

      // Si j'ai pas eu d'erreur
      // On va préparer la donnée, on a une tableau d'objet simple
      // On veut avoir un tableau d'instances
      // On récupère les rows
      const rows = result.rows;
      // Puis on les parcours afin de retourner un nouveau tableau d'instance
      const data = rows.map((row) => {
        return new this(row);
      });

      // On appel la fonction de retour pour retourner le résultat
      // au controller
      return callback(null, data);
    });
  }

  static findOne(id, callback) {
    const query = {
      text: `SELECT * FROM "${this.tableName}" WHERE "id" = $1`,
      values: [id]
    }

    // Puis on l'execute
    database.query(query, (err, result) => {
      // Si j'ai une erreur on stop et on déclenche le callback
      // avec l'erreur
      if (err) {
        return callback(err, null);
      }

      // Si j'ai pas eu d'erreur
      // On va préparer la donnée, on a une tableau d'objet simple
      // On veut avoir une d'instances
      // On récupère la première row
      const row = result?.rows?.[0];
      
      // Si j'ai bien trouvé mon enregistrement
      if (row) {
        const datum = new this(row);
        
        // On appel la fonction de retour pour retourner le résultat
        // au controller
        return callback(null, datum);
      }
      // Si j'ai pas trouvé l'enregistrement
      else {
        // Je renvoie une erreur
        return callback(new Error(this.name + ' not found'), null);
      }
    });
  }

  create(callback) {
    console.log("INSTANCE, this dans le core model", this);
    // const query = {
    //   text: `SELECT * FROM "${tableName}"`
    // }

  }
}

module.exports = CoreModel;
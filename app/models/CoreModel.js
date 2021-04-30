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

  static findBy(params, callback) {

    // On parcours les clefs de l'objet params
    const tbKeysAndPlaceholder = []
    const tbValues = [];

    let placeholderIndex = 1;
    for (let paramKey in params){
      // On push la ligne générée par la clef du paramètre en cours
      tbKeysAndPlaceholder.push(
        // ex: "id" = $1
        `"${paramKey}" = $${placeholderIndex}`
      );
      // Et on push le valeur du paramètre en cours
      tbValues.push(params[paramKey]);

      // On incrément la valeur du placeholder
      placeholderIndex++;
    }

    const query = {
      text: `
      SELECT * 
      FROM "${this.tableName}" 
      WHERE 
        ${tbKeysAndPlaceholder.join(' AND ')}`,
      values: tbValues
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
        
    let tbKeys = [];
    let tbValues = [];
    let placeHolders = [];

    // On récupère la liste des noms des propriétés
    let propertiesName = Object.getOwnPropertyNames(this);
    
    // On veut pas l'id, puisqu'il va être auto calculé par la BDD
    // donc on filtre tous les noms de propriété, en gardant tout sauf l'id
    propertiesName = propertiesName.filter((property) => {
      if (property === "_id"){
        return false;
      }
      else {
        return true;
      }
    });

    // Puis on va remplir nos variables pour la requete SQL
    propertiesName = propertiesName.forEach((property, index) => {
      // Mais elles ont toutes un underscore, ca va nous géner
      // On va donc créer un nouveau tableau avec ces données mais
      // sans les underscores
      tbKeys.push(`"${property.substring(1)}"`);

      // Récupération de la valeur de notre propriété
      tbValues.push(this[property]);

      // On ajoute le placeholder
      placeHolders.push('$' + (index + 1))
    })

    const query = {
      text: `
        INSERT INTO "${this.constructor.tableName}"
        (${tbKeys.join(' ,')})
        VALUES
        (${placeHolders.join(' ,')})
        RETURNING id;
        `,
      values: tbValues
    }

    // Puis on l'execute
    database.query(query, (err, result) => {
      // Si j'ai une erreur on stop et on déclenche le callback
      // avec l'erreur
      if (err) {
        return callback(err, null);
      }

      // Si j'ai pas eu d'erreur
      // Je récupère l'id qui est dispo grace au RETURNING id de la requete
      const id = result?.rows?.[0]?.id;

      // Si j'ai bien un id
      if (id) {
        // Je viens mettre à jour mon instance pour y mettre l'id dedans*
        this.id = id;
        
        // On appel la fonction de retour pour retourner le résultat
        // au controller
        return callback(null, this);
      }
      // Si j'ai pas trouvé l'utilisateur
      else {
        // Je renvoie une erreur
        return callback(new Error(this.constructor.name + ' not created'), null);
      }
    });
  }

  update(callback) {
        
    let tbKeysPlaceholder = [];
    let tbValues = [];

    // On récupère la liste des noms des propriétés
    let propertiesName = Object.getOwnPropertyNames(this);
    
    // On veut pas l'id, puisqu'il va être nous servir dans le where et qu'on veut pas le changer
    // donc on filtre tous les noms de propriété, en gardant tout sauf l'id
    propertiesName = propertiesName.filter((property) => {
      if (property === "_id"){
        return false;
      }
      else {
        return true;
      }
    });

    // Puis on va remplir nos variables pour la requete SQL
    propertiesName = propertiesName.forEach((property, index) => {
      // Mais elles ont toutes un underscore, ca va nous géner
      // On va donc créer un nouveau tableau avec ces données mais
      // sans les underscores
      // Génère une ligne du style
      //     "email" = $1
      tbKeysPlaceholder.push(`"${property.substring(1)}" = $${index + 1}`);

      // Récupération de la valeur de notre propriété
      tbValues.push(this[property]);
    })

    // L'id ne faisant pas partit de l'opération, on le rajoute au tableau de values
    // en prévention du where qui suit ci-dessous

    tbValues.push(this['_id']);
    const query = {
      text: `
      UPDATE "${this.constructor.tableName}"
      SET 
      ${tbKeysPlaceholder.join(', ')}
      WHERE id = $${tbKeysPlaceholder.length+1};
      `,
      values: tbValues
    }

    console.log("query", query);

    // Puis on l'execute
    database.query(query, (err, result) => {
      // Si j'ai une erreur on stop et on déclenche le callback
      // avec l'erreur
      if (err) {
        return callback(err, null);
      }

      // Si j'ai pas eu d'erreur
      // Je vérifie qu'il y a bien eu une modification
      if (result.rowCount) {
        // On appel la fonction de retour pour retourner le résultat
        // au controller
        return callback(null, this);
      }
      // Si j'ai pas eu de modification
      else {
        // Je renvoie une erreur
        return callback(new Error(this.constructor.name + ' not updated'), this);
      }
    });
  }

  delete(callback) {
    // On déclare la query SQL
    let query = {
      text: `DELETE FROM "${this.constructor.tableName}" WHERE id = $1;`,
      values: [this.id]
    };

    // Puis on l'execute
    database.query(query, (err, result) => {
      // Si j'ai une erreur on stop et on déclenche le callback
      // avec l'erreur
      if (err) {
        return callback(err);
      }

      // Si j'ai pas eu d'erreur
      // Je vérifie qu'il y a bien eu une suppression
      if (result.rowCount) {
        // On appel la fonction de retour pour retourner le résultat
        // au controller
        return callback(null);
      }
      // Si j'ai pas eu de suppression
      else {
        // Je renvoie une erreur
        return callback(new Error(this.constructor.name + ' not delete'));
      }
    });
  }

  /**
   * Fonction permettant de sauvegarder un enregistrement
   * Si il existe déjà en BDD, il le met à jour sinon il le créé
   * @param {Function} callback 
   */
  save(callback) {
    // Si jamais l'enregistrement en cours a un ID
    if (this._id) {
      // Alors il devrait exister en BDD, dans ce cas la on met à jour
      this.update(callback);
    }
    // Si il n'a pas d'id, on ne peut pas le retracer en BDD
    else {
      // Donc on l'insère
      this.create(callback);
    }
  }
}

module.exports = CoreModel;
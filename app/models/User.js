const CoreModel = require('./CoreModel');
const database = require('../database');

class User extends CoreModel {
  _email;
  _password;
  _firstname;
  _lastname;

  constructor(obj) {
    super(obj)
    this.email = obj.email;
    this.password = obj.password;
    this.firstname = obj.firstname;
    this.lastname = obj.lastname;
  }

  // Set / Get de email
  set email(email) {
    this._email = email;
  }

  get email() {
    return this._email;
  }

  // Set / Get de password
  set password(password) {
    this._password = password;
  }

  get password() {
    return this._password;
  }

  // Set / Get de firstname
  set firstname(firstname) {
    this._firstname = firstname;
  }

  get firstname() {
    return this._firstname;
  }

  // Set / Get de lastname
  set lastname(lastname) {
    this._lastname = lastname;
  }

  get lastname() {
    return this._lastname.toUpperCase();
  }

  get fullName() {
    return this.firstname + ' ' + this.lastname
  }

  static findAll(callback) {
    // On déclare la query SQL
    let query = {
      text: `SELECT * FROM "user";`
    };

    // Puis on l'execute
    database.query(query, (err, result) => {
      // Si j'ai une erreur on stop et on déclenche le callback
      // avec l'erreur
      if (err) {
        return callback(err, null);
      }

      // Si j'ai pas eu d'erreur
      // On va préparer la donnée, on a une tableau d'objet simple
      // On veut avoir un tableau d'instances d'utilisateurs
      // On récupère les rows
      const rows = result.rows;
      // Puis on les parcours afin de retourner un nouveau tableau d'instance
      const users = rows.map((row) => {
        return new User(row);
      });

      // On appel la fonction de retour pour retourner le résultat
      // au controller
      return callback(null, users);
    });
  }

  static findById(id, callback) {
    // On déclare la query SQL
    let query = {
      text: `SELECT * FROM "user" WHERE "id" = $1;`,
      values: [id]
    };

    // Puis on l'execute
    database.query(query, (err, result) => {
      // Si j'ai une erreur on stop et on déclenche le callback
      // avec l'erreur
      if (err) {
        return callback(err, null);
      }

      // Si j'ai pas eu d'erreur
      // Je récupère la première ligne
      const row = result?.rows?.[0];

      // Si j'ai bien trouvé l'utilisateur
      if (row) {
        const user = new User(row);
        
        // On appel la fonction de retour pour retourner le résultat
        // au controller
        return callback(null, user);
      }
      // Si j'ai pas trouvé l'utilisateur
      else {
        // Je renvoie une erreur
        return callback(new Error('User not found'), null);
      }
    });
  }

  insert(callback) {
    // On déclare la query SQL
    let query = {
      text: `
      INSERT INTO "user"
      (email, password, firstname, lastname)
      VALUES
      ($1, $2, $3, $4)
      RETURNING id;
      `,
      values: [this.email, this.password, this.firstname, this.lastname]
    };

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
        return callback(new Error('User not created'), null);
      }
    });
  }

  update(callback) {
    // On déclare la query SQL
    let query = {
      text: `
      UPDATE "user"
      SET 
        email = $1, 
        password = $2, 
        firstname = $3, 
        lastname = $4
      WHERE id = $5;
      `,
      values: [this.email, this.password, this.firstname, this.lastname, this.id]
    };

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
        return callback(new Error('User not updated'), this);
      }
    });
  }

  delete(callback) {
    // On déclare la query SQL
    let query = {
      text: `DELETE FROM "user" WHERE id = $1;`,
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
        return callback(new Error('User not delete'));
      }
    });
  }

}

module.exports = User;
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

  static findOne(id, callback) {
    const query = {
      text: `SELECT * FROM "tag" WHERE "id" = $1;`,
      values: [id]
    }

    database.query(query, (err, result) => {
      if (err){
        return callback(err, null);
      }
      
      // On créé une variable tagObj qui va représenté le premier élément
      // du tableau rows, si possible
      const tagObj = result?.rows?.[0];

      // Si on a trouvé un élément
      if (tagObj){
        // Alors on instance le model Tag
        const tagInstance = new Tag(tagObj);
        // Et on déclenche le callback avec les bon paramètres
        return callback(null, tagInstance)
      }
      else {
        // Si on a pas trouvé le Tag
        // Alors on déclenche le callback mais avec aucun Tag
        return callback(null, null);
      }
    });
  }

  /**
   * Fonction permettant de créer le tag en BDD
   * @param {func} callback 
   */
   create(callback) {
    // On créé la requete d'insertion de cette instance en cours en BDD
    const query = {
      // Sachant que nous ne connaissons pas l'id à l'avance
      // puisque c'est PG qui va le générer tout seul
      // On écrit dans la requete le "RETURNING id", pour que PG
      // nous retourne l'id dont il se sera servit en réponse à l'insertion
      text: `INSERT INTO "tag" ( name ) VALUES ($1) RETURNING id`,
      values: [this.name]
    }

    // On execute la requete SQL de création du TAG
    database.query(query, (err, result) => {
      // Si y'a une erreur, l'entrée n'est pas surement créée, donc on stop ici
      if (err){
        return callback(err, null);
      }
      // Si ça c'est bien passé, PG a créé à ce niveau là du code
      // une entrée en BDD, AVEC un id, qu'il a choisit tout seul
      // grâce au fait que la colonne id de la table dans PG était serial
      // Donc la le tag existe en BDD avec un ID ( on sait pas encore lequel )

      // On vient récupèrer l'id créé par pg à l'insertion de notre Tag
      const insertedID = result?.rows?.[0]?.id;
    
      // Ici la variable insertedID vaut l'id utilisé par PG pour créer le tag en BDD

      // Maintenant qu'on a l'id, on va pouvoir modifier l'instance en cours
      // afin d'y stocker cette nouvelle information
      // On vient donc modifier la propriété id de l'instance en cours
      this.id = insertedID;

      // A partir de là, this avait déjà name, il en plus l'id de rempli 

      // On va venir informer l'appelant que la requête s'est bien passée
      // Mais pour respecter les conventions, on va toujours envoyer 2
      // paramètres, l'erreur ( ici à null ) et la data
      // Ici la data c'est l'instance en cours, on a pas créé de nouvelle 
      // instance, on l'a juste modifié, donc on renvoie la même
      return callback(null, this)
    });
  }

  /**
   * Fonction permettant de modifier un tag en BDD
   * @param {func} callback 
   */
   update(callback) {
    // On créé la requete de modification de cette instance en cours en BDD
    const query = {
     text: `UPDATE "tag" SET name = $1 WHERE "id" = $2`,
      values: [this.name, this.id]
    }

    // On execute la requete SQL de modification du TAG
    database.query(query, (err, result) => {
      // Si y'a une erreur, l'entrée n'est pas surement modifiée, donc on stop ici
      if (err){
        return callback(err, null);
      }
      // Si ça c'est bien passé on a pas créé de nouvelle 
      // Donc on renvoie la même
      return callback(null, this)
    });
  }

  delete(callback) {
    const query = {
      text: `DELETE FROM "tag" WHERE id = $1;`,
      values: [this.id]
    };
    database.query(query, (err, result) => {
      if (err) {
        callback(err, false);
      }
      if (result.rowCount) {
        // au moins une ligne a été supprimé => tout va bien !
        callback(null, true);
      } else {
        callback('Delete did not target any rows', false);
      }
    });
  };

}

module.exports = Tag;
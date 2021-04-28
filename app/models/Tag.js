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
}

module.exports = Tag;
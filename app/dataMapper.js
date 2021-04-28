const database = require('./database');
const Level = require('./models/Level');

const dataMapper = {
  getAllLevels: (callback) => {
    const query = {
      text: `SELECT * FROM "level";`,
    }

    database.query(query, (err, result) => {
      if (err){
        return callback(err, null);
      }
      const rows = result.rows;
      
      // On parcour toutes les lignes retournées par PG
      // Et pour chaque ligne, on va créer une instance de Level
      // Puis retourner cette instance pour qu'elle aille se stocker
      // dans le nouveau tableau level
      const levels = rows.map((row) => {
        return new Level(row);
      })

      // On peut même l'écrire en une ligne
      // const levels = rows.map((row) => new Level(row));
      return callback(null, levels);
    });
  },

  getOneLevel(id, callback){
    const query = {
      text: `SELECT * FROM "level" WHERE "id" = $1;`,
      values: [id]
    }

    database.query(query, (err, result) => {
      if (err){
        return callback(err, null);
      }
      // On créé une variable levelObj qui va représenté le premier élément
      // du tableau rows, si possible
      const levelObj = result?.rows?.[0];

      // Si on a trouvé un élément
      if (levelObj){
        // Alors on instance le model level
        const levelInstance = new Level(levelObj);
        // Et on déclenche le callback avec les bon paramètres
        return callback(null, levelInstance)
      }
      else {
        // Si on a pas trouvé le level
        // Alors on déclenche le callback mais avec une aucun level
        return callback(null, null);
      }
      
    });
  }
}

module.exports = dataMapper;
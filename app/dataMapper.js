const database = require('./database');
const Level = require('./models/Level');

const dataMapper = {
  getAllLevels: (callback) => {
    const query = {
      text: `SELECT * FROM "level";`
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
  }
}

module.exports = dataMapper;
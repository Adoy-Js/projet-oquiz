const dotenv = require('dotenv');
dotenv.config();

const Tag = require('./models/Tag');

// Solution model
// Tag.findAll((err, tags) => {
//   console.log("findAll Callback", {err, tags})
// });

// Tag.findOne(2, (err, tag) => {
//   console.log("findOne Callback", {err, tag})
// });

// J'ai besoin de créer un tag, je créé donc une nouvelle instance
// de mon tag, et je lui donne un nom
// pas d'id puisque il existe pas encore en BDD, on va laisser
// pg gérer l'auto incrémentation de l'id, c'est lui tout seul
// qui va me remplir l'id dans mon instance
const tagToCreate = new Tag({
  name: 'Mon nouveau Tag',
});

// Instance crée, j'ai donc maintenant besoin de l'insérer en BDD
// Je déclenche une fonction qui permet de le faire
tagToCreate.create((err, createdTag) => {
  // Ici l'insertion est terminée
  // createdTag est littéralement tagToCreate
});

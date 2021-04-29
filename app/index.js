const dotenv = require('dotenv');
dotenv.config();

const User = require('./models/User');

// Récupération de la liste des utilisateurs
/* User.findAll((errFindAll, users) => {
  if (errFindAll){
    console.error('errFindAll', errFindAll);
  }
  console.log("Liste des users", users);
}); */

// Récupération d'un utilisateur
/* User.findById(3, (errFindOne, user) => {
  if (errFindOne){
    console.error('errFindOne', errFindOne);
  }
  console.log("Recherche de l'user id 3", user);
}); */

// Création d'un utilisateur
/* const userToCreate = new User({
  email: 'superman@hero.io',
  password: 'jesuisclarkkent',
  firstname: 'Clark',
  lastname: 'Kent'
});

userToCreate.insert((errCreate, userCreated) => {
  if (errCreate){
    console.error('errCreate', errCreate);
  }
  console.log("Utilisateur inséré", userCreated);
}); */

// Modification d'un utilisateur
/* User.findById(4, (errFind, user) => {
  if (errFind){
    return console.error("ErrFind", errFind);
  }
  else if (!user){
    return console.error('User not found');
  }
  user.firstname = 'Lex';
  user.lastname = 'Luthor';
  user.update((errUpdate, userUpdated) => {
    if (errUpdate){
      console.error('errUpdate', errUpdate);
    }
    console.log("Utilisateur modifié", userUpdated);
  });
}) */

// Suppression d'un utilisateur
User.findById(4, (errFind, user) => {
  if (errFind){
    return console.error("ErrFind", errFind);
  }
  else if (!user){
    return console.error('User not found');
  }
  user.delete((errDelete) => {
    if (errDelete){
      console.error('errDelete', errDelete);
    }
    console.log("Utilisateur supprimé");
  });
})

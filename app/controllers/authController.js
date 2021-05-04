const bcrypt = require('bcrypt');
const { User } = require('../models');

const authController = {
  loginPage: (req, res, next) => {
    res.render('login');
  },
  loginAction: (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    // On tente l'identification
    // on récupère l'utilisateur en BDD
    User.findOne({ where: { email }}).then((user) => {
      // Si on a pas l'user, c'est que l'adresse email est fausse
      if (!user){
        return res.render('login', { 
          error: `L'adresse email ne correspond à aucun compte`,
          email
        });
      }

      // Identification passée, on tente l'authentification
      bcrypt.compare(password, user.password, (err, isCorrect) => {
        // SI y'a un problème durant la comparaison on a une erreur
        if (err){
          return next(err);
        }

        // Si la comparaison s'est bien passée, mais que les 2 mots de passe
        // ne sont pas les mêmes alors, on rend la vue avec une erreur
        if (!isCorrect){
          return res.render('login', { 
            error: `Le mot de passe n'est pas correct`,
            email
          });
        }

        // Sinon l'utilisateur est authentifié, on va donc persister sa connexion
        req.session.userConnected = user;
        // Puis on redirige vers la page d'accueil
        res.redirect('/');
      });
    })
    .catch((error) => {
      next(error);
    });
  },

  logoutAction:(req, res, next) =>{
    req.session.userConnected = null;
    res.redirect('/');
  }
}

module.exports = authController;
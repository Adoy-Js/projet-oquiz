const bcrypt = require('bcrypt');
const { User } = require('../models');

const authController = {
  loginPage: (req, res, next) => {
    res.render('login');
  },
  signUpPage: (req, res, next) => {
    res.render('signup');
  },
  loginAction: (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    // On tente l'identification
    // on récupère l'utilisateur en BDD
    User.findOne({ where: { email } }).then((user) => {
      // Si on a pas l'user, c'est que l'adresse email est fausse
      if (!user) {
        return res.render('login', {
          error: `L'adresse email ne correspond à aucun compte`,
          email
        });
      }

      // Identification passée, on tente l'authentification
      bcrypt.compare(password, user.password, (err, isCorrect) => {
        // SI y'a un problème durant la comparaison on a une erreur
        if (err) {
          return next(err);
        }

        // Si la comparaison s'est bien passée, mais que les 2 mots de passe
        // ne sont pas les mêmes alors, on rend la vue avec une erreur
        if (!isCorrect) {
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
  signUpAction: (req, res, next) => {
    // Je veux récupérer toutes ces propriétés : 
    //    lastname, firstname, email, password, passwordConfirm
    // Depuis l'objet req.body
    // Je pourrais faire
    // const lastname = req.body.lastname
    // const firstname = req.body.firstname
    // Ca marche mais c'est chiant y'a beaucoup à écrire on peut simplifier

    // On déstructure req.body, à gauche on choisis ce qu'on veut récupérer
    // Et ça va créer une variable par propriété ( avec le même nom ) et avec
    // la portée qu'on aura choisi
    // C'est la décomposition d'un objet, le destructuring
    // cf https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#d%C3%A9composer_un_objet
    const {
      lastname,
      firstname,
      email,
      password,
      passwordConfirm
    } = req.body;

    try {
      // On fait nos vérification
      // Si y'a une erreur , on throw une erreur
      if (lastname.trim() === '') {
          throw new Error('Le nom n\'est pas saisi');
      }
      if (firstname.trim() === '') {
          throw new Error('Le prénom n\'est pas saisi');
      }
      if (email.trim() === '') {
          throw new Error('Le email n\'est pas saisi');
      }
      if (password.trim() === '') {
          throw new Error('Le mot de passe n\'est pas saisi');
      }
      if (passwordConfirm.trim() !== password.trim()) {
          throw new Error('Les mots de passe ne correspondent pas');
      }

      // Vérification de l'adresse email via un regexe chopé sur le net
      // On cherche pas à le comprendre, on fait confiance
      let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(!re.test(email.toLowerCase())){
        throw new Error('L\'adresse email n\'est pas bien structurée');
      }

      // Si on est arrivé jusqu'ici, c'est qu'on a pas throw d'erreur, donc notre formulaire
      // est correct

      // On vérifie si l'utilisateur n'existe pas
      User.findOne({where: { email: email}})
        .then((user) => {
          // Si j'ai un user, c'est que l'adresse email existe déjà en BDD
          if (user){
            // Donc on ne créé pas le compte
            // Je throw une erreur
            // Je passe dans le catch de ma promesse
            // Et pas dans le catch du block try catch ( puisque on est asynchrone )
            throw new Error('L\'utilisateur existe déjà');
          }

          // Sauvegarde de l'utilisateur
          // On encrypte son mot de passe
          const encryptedPassword = bcrypt.hashSync(password, 10);

          // Puis on le créé en BDD
          User.create({
            email,
            firstname,
            lastname,
            password: encryptedPassword
          })
          .then((createdUser) => {
            // On connecte l'utilisateur
            req.session.userConnected = createdUser;
            res.redirect('/');
          })
          .catch((e) => {
            return res.render('signup', {
              error: error.message
            });
          });
        })
        // Ce catch n'a aucun rapport avec le bloc try catch du dessus
        // il est direction rattaché à la promesse représentée par findOne
        .catch((error) => {
          return res.render('signup', {
            error: error.message
          });
        });
    }
    catch (error) {
        return res.render('signup', {
          error: error.message
        });
    }
  },
  signOutAction: (req, res) => {
    req.session.userConnected = null;
    res.redirect('/');
  }
}

module.exports = authController;
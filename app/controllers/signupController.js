const bcrypt = require('bcrypt');
const {
  User
} = require('../models');

const signupController = {
  signupPage: (req, res, next) => {
    res.render('signup');
  },
  signupAction: (req, res, next) => {
    const lastname = req.body.lastname;
    const firstname = req.body.firstname;
    const email = req.body.email;
    const password = req.body.password;
    const passwordConfirm = req.body.passwordConfirm;

    User.findOne({
      where: {
        email
      }
    }).then((user) => {
      if (user) {
        return res.render('signup', {
          error: `le compte existe deja`,
        });
      }


      if (passwordConfirm !== password) {
        res.render('signup', {
          error: "Le mot de passe n'est pas identique"
        })
      } else {
        User.create({
            email,
            password: bcrypt.hashSync(password, 10),
            firstname,
            lastname,
            role: "user"
          })
          .then((user) => {
            res.redirect('/');
          }).catch((error) => {
            next(error);
          });
      }
    }).catch((error) => {
      next(error);
    });

  }
}



module.exports = signupController;
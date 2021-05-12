module.exports = (req, res, next) => {
  // Si je suis connecté
  if (req.session.userConnected) {
    // Et si je suis admin
    if (req.session.userConnected.role === 'admin') {
      return next();
    }
    else {
      return res.status(403).render('error/403');
    }
  }
  return res.status(401).render('error/401');
<<<<<<< HEAD
}
=======
}
>>>>>>> 66101c0496ccc58ce332a1601f2f848fb5a125b0

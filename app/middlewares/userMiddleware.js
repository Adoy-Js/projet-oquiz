module.exports = (req, res, next) => {
  // Si je suis connecté
  if (req.session.userConnected) {
    // Et si je suis admin OU user
    if (['admin', 'user'].includes(req.session.userConnected.role)) {
      return next();
    }
  }
  return res.status(401).render('error/401');
}
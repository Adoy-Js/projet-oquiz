const { Tag } = require('../models');

const tagsController = {
  indexAction: (req, res) => {
    Tag.findAll().then((tags) => {
      res.render('tags', {
        tags
      });
    });
  },
  detailAction: (req, res) => {
    // On récupère l'id du tag via les paramètres de route
    const tagId = req.params.id;

    Tag.findByPk(tagId, {
      include: {
        association: 'quizzes',
        include: 'user'
      }
    }).then((tag) => {
      res.render('tag', tag.dataValues);
    });
  }
}

module.exports = tagsController;
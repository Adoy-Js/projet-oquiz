<<<<<<< HEAD
const { Tag } = require("../models");

const tagsController = {
  indexAction: async (req, res, next) => {
    try {
      const tags = await Tag.findAll();
      if (!tags) {
        throw new Error("pas de tag");
      }
      res.render("tags", {
        tags,
      });
    } catch (error) {
      next(error);
    }
  },

  detailAction: async (req, res, next) => {
    // On récupère l'id du tag via les paramètres de route
    const tagId = req.params.id;

    try {
      const tag = await Tag.findByPk(tagId, {
        include: {
          association: 'quizzes',
          include: 'user'
        }
      });
      res.render("tag", tag.dataValues);
    } catch(e) {
      next(e);
    }
  },
};
=======
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
>>>>>>> 66101c0496ccc58ce332a1601f2f848fb5a125b0

module.exports = tagsController;
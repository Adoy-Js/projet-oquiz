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

module.exports = tagsController;
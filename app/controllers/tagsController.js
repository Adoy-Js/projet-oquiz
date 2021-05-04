const { Tag } = require('../models');

const tagsController = {
  indexAction: (req, res) => {
    Tag.findAll().then((tags) => {
      res.render('tags', {
        tags
      });
    });
  }
}

module.exports = tagsController;
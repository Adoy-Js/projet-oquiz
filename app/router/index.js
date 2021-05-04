const mainController = require('../controllers/mainController');

const router = require('express').Router()

router.get('/', mainController.indexAction);

module.exports = router;
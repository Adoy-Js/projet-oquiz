const mainController = require('../controllers/mainController');
const quizController = require('../controllers/quizController');
const tagsController = require('../controllers/tagsController');

const router = require('express').Router()

// Page d'accueil
router.get('/', mainController.indexAction);

// Page de détail d'un quiz
router.get('/quiz/:id', quizController.detailAction);

// Page de listing des tags
router.get('/tags', tagsController.indexAction);

module.exports = router;
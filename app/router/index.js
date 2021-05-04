const mainController = require('../controllers/mainController');
const quizController = require('../controllers/quizController');

const router = require('express').Router()

// Page d'accueil
router.get('/', mainController.indexAction);

// Page de détail d'un quiz
router.get('/quiz/:id', quizController.detailAction);

module.exports = router;
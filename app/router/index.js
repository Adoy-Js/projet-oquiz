const mainController = require('../controllers/mainController');
const quizController = require('../controllers/quizController');
const tagsController = require('../controllers/tagsController');
const authController = require('../controllers/authController');

const router = require('express').Router()

// Page d'accueil
router.get('/', mainController.indexAction);

// Page de détail d'un quiz
router.get('/quiz/:id', quizController.detailAction);

// Page de listing des tags
router.get('/tags', tagsController.indexAction);
// Page de détail d'un tag
router.get('/tag/:id', tagsController.detailAction);

// Page de login
router.get('/login', authController.loginPage);
// Soumission du login
router.post('/login', authController.loginAction);

module.exports = router;
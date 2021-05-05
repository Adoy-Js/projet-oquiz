const router = require('express').Router()

const mainController = require('../controllers/mainController');
const quizController = require('../controllers/quizController');
const tagsController = require('../controllers/tagsController');
const authController = require('../controllers/authController');
const userMiddleware = require('../middlewares/userMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

// Page d'accueil
router.get('/', mainController.indexAction);

// Page de détail d'un quiz
router.get('/quiz/:id', quizController.detailAction);

// Page de listing des tags
router.get('/tags',  tagsController.indexAction);
// Page de détail d'un tag
router.get('/tag/:id', tagsController.detailAction);

// Page de login
router.get('/login', authController.loginPage);

// Soumission du login
router.post('/login', authController.loginAction);

// Page de l'inscription
router.get('/signup', authController.signUpPage);

// Soumission de l'inscription
router.post('/signup', authController.signUpAction);

// Déconnexion
router.get('/signout', authController.signOutAction);

// Page de profil
router.get('/profile', userMiddleware, mainController.profilePage);

// Page d'admin
router.get('/admin', adminMiddleware, mainController.adminPage);

module.exports = router;
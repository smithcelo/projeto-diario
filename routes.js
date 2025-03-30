const express = require('express');
const router = express.Router();
const postController = require('./src/controllers/postController');
const homeController = require('./src/controllers/homeController');
const postsController = require('./src/controllers/postsController');
const loginController = require('./src/controllers/loginController');
const aboutController = require('./src/controllers/aboutController');
const {checkCookie} = require('./src/middlewares/middleware');


router.use((req, res, next) => {
    console.log(`Método: ${req.method}, Rota: ${req.originalUrl}`);
    next();
});



router.get(['/home', '/?page=1'], homeController.index);

router.get('/posts', postsController.index);

router.get(['/about', '/'], aboutController.index);

router.get('/new/', checkCookie, postController.index);
router.post('/new/post', checkCookie, postController.newPost); 
router.get('/posts/post/:id', checkCookie, postController.openPost); 

router.get('/login/', loginController.index);
router.post('/login/register', loginController.register);
router.post('/login/login', loginController.login);
router.get('/login/logout', loginController.logout);

module.exports = router;

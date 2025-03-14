const express = require('express');
const router = express.Router();
const postController = require('./src/controllers/postController');
const homeController = require('./src/controllers/homeController');
const postsController = require('./src/controllers/postsController');
const loginController = require('./src/controllers/loginController');
const aboutController = require('./src/controllers/aboutController');
const {loginRequired} = require('./src/middlewares/middleware');
// const {middlewareTeste} = require('./src/middlewares/middleware')

router.use((req, res, next) => {
    console.log(`Método: ${req.method}, Rota: ${req.originalUrl}`);
    next();
});


router.get(['/home', '/?page=1'], homeController.index);

router.get('/posts', postsController.index);

router.get(['/about', '/'], aboutController.index);

router.get('/new/', loginRequired, postController.index);
router.post('/new/post', loginRequired, postController.newPost); 
router.get('/posts/post/:id', loginRequired, postController.openPost); 

router.get('/login/', loginController.index);
router.post('/login/register', loginController.register);
router.post('/login/login', loginController.login);
router.get('/login/logout', loginController.logout);

module.exports = router;

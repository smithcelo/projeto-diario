const express = require('express');
const router = express.Router();
const postController = require('./src/controllers/postController');
const homeController = require('./src/controllers/homeController');
const postsController = require('./src/controllers/postsController');
const loginController = require('./src/controllers/loginController');
const aboutController = require('./src/controllers/aboutController');
const prefController = require('./src/controllers/prefController');
const {checkCookie} = require('./src/middlewares/middleware');


router.use((req, res, next) => {
    console.log(`Método: ${req.method}, Rota: ${req.originalUrl}`);
    next();
});

router.get(['/home', '/?page=1','/'],checkCookie, homeController.index);

router.get('/toggle-dark-mode', prefController.darkMode);

router.get('/posts', checkCookie, postsController.index);
router.get('/posts/:id', checkCookie, postController.openPost);
router.delete('/posts/delete/:id', checkCookie, postsController.delete); //botão não é mais um link. agora chama uma função no frontend (window.funcao), a funçao da um fetch na rota e o controller apaga
router.get('/posts/edit/:id', checkCookie,postsController.editForm);
router.put('/posts/update/:id',checkCookie, postsController.updatePost); //bem semelhante ao delete. o botão da edição está quebrado!

router.get(['/about'], aboutController.index);

router.get('/new/', checkCookie, postController.index);
router.post('/new/post', checkCookie, postController.newPost); 

router.get('/login/', loginController.index);
router.post('/login/register', loginController.register);
router.post('/login/login', loginController.login);
router.get('/login/logout', loginController.logout);

module.exports = router;

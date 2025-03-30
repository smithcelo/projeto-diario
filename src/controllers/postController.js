const NewPost = require('../models/PostModel');

exports.index = (req, res) => {
  return res.render('new');
}

exports.newPost = async function (req, res) {
  try {

    const newPost = new NewPost({
      ...req.body,
      user: res.locals.user._id
    });
    await newPost.post();

    if (newPost.errors.length > 0) {
      //flash com lista de erros
      return res.redirect('/new/');
    }
    
    //flash de post postado com sucesso
    return res.redirect('/new');
    
  } catch (e) {
    console.log(e);
    return res.render('404');
  }
};

exports.openPost = async function (req, res) {
  console.log('entrei na open post');
  const post = await NewPost.buscaPorId(req.params.id);
  return res.render('post', { post });
};
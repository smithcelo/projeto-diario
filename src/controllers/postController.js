const NewPost = require('../models/PostModel');

exports.index = (req, res) => {
  return res.render('new', {post:null}); //garanto que o post nunca vai ser undefined pra não dar problema 
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
  const post = await NewPost.buscaPorId(req.params.id);
  // console.log('Req.params: ', req.params);
  return res.render('post', { post });
};
const NewPost = require('../models/PostModel');

exports.index = (req, res) => {
  return res.render('new');
}

exports.newPost = async function(req, res) {
  try {

    const newPost = new NewPost({...req.body, 
      user: req.session.user._id});
    await newPost.post();
    
    if (newPost.errors.length > 0) {
      req.flash('errors', newPost.errors);
      req.session.save(function() {
        return res.redirect('/new/');
      });
      return;
    }

    req.flash('success', 'Post feito com sucesso.');
    req.session.save(function() {
      return res.redirect('/new');
    });
  } catch (e) {
    console.log(e);
    return res.render('404');
  }
};

exports.openPost = async function (req, res) {
  console.log('entrei na open post');
  const post = await NewPost.buscaPorId(req.params.id);
  return res.render('post',{post});
};
const Post = require('../models/PostModel');

exports.index = async (req, res) => {
  
  if (!res.locals.user) {
    console.log('Cheguei na checagem de user');
    res.redirect('/login');
  }

  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  console.log('Res locals user da home:', res.locals.user)
  console.log('***')
  console.log('Res ID: ', res.locals.user._id);
  const userId = res.locals.user._id;


  try {
    const posts = await Post.getPostsPaginated(userId, page, limit);
    const totalPosts = await Post.countPosts(userId);

    res.render('index', {
      posts,
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit)
    });
  } catch (error) {
    console.error('Erro na busca:', error);
    res.status(500).send('Erro interno do servidor');
  }
  //aqui está a sugestão
};


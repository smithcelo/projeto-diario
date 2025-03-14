const Post = require('../models/PostModel');

exports.index = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const userId = req.session.user._id;

  try {
    const posts = await Post.getPostsPaginated(userId, page, limit);
    const totalPosts = await Post.countPosts(userId);

    res.render('index', {
      posts,
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit)
    });
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    res.status(500).send('Erro interno do servidor');
  }
};

  
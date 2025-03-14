//postsController
const Post = require ('../models/PostModel');

exports.index = async (req, res) => {
    if(!req.session.user) {
        res.render('about');
        return;
    }

    const userId = req.session.user._id;
    
    const posts = await Post.buscaPosts(userId);
    res.render('posts', {posts});
}
const Post = require ('../models/PostModel');

exports.index = async (req, res) => {
    if(!res.locals.user) {
        res.render('about');
        return;
    }

    const userId = res.locals.user._id;
    
    const posts = await Post.buscaPosts(userId);
    res.render('posts', {posts});
}
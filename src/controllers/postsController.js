const Post = require('../models/PostModel');

exports.index = async (req, res) => {

    const userId = res.locals.user._id;

    const posts = await Post.buscaPosts(userId);
    // console.log(posts);
    res.render('posts', { posts });
};

exports.delete = async (req, res) => {
    await Post.delete(req.params.id);
    res.status(204).send(); // pra usar com fetch não pode usar redirect
};

exports.editForm = async function (req, res) {
    if (!req.params.id) return res.render('404');
    const post = await Post.buscaPorId(req.params.id);
    if (!post) return res.render('404');

    res.render('new', { post });
}

exports.updatePost = async function (req, res) {
    if (!req.params.id) return res.render('404');
    const post = new Post(req.body);
    await post.edit(req.params.id);

    return res.status(200).json({ message: 'Post atualizado com sucesso' }); //se eu não colocar a response, o programa empaca. lembrar de não usar redirect em put/delete
}
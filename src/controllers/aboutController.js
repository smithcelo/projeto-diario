exports.index = async (req, res) => {
    console.log('User em res.locals:', res.locals.user);
    res.render('about');
  };
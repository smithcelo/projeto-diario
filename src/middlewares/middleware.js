exports.midErrors = (req, res, next) => {
  res.locals.errors = req.flash('errors');
  res.locals.success = req.flash('success');
  res.locals.user = req.session.user;
  next();
};

exports.middlewareTeste = (req, res, next) => {
  console.log('Passei pelo teste');
  next();
}

exports.checkCsrfError = (err, req, res, next) => {
  if (err) {
    return res.render('404');
  }

  next();
};

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};

exports.loginRequired = (req, res, next) => {
  if (!req.session.user) {
    req.flash('errors', 'Você precisa fazer login.');
    req.session.save(() => res.redirect('/login'));
    return;
  }
  req.user = req.session.user; // Adicionando user à requisição
  next();
};

// middlewares/logUserId.js
// exports.iDControl = (req, res, next) => {
//   if (req.user && req.user._id) {
//       console.log('User ID:', req.user._id);
//   } else {
//       console.log('Usuário não autenticado');
//   }
//   next();
// };



//   next();
// };
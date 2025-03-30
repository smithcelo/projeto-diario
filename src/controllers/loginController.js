const Login = require('../models/UserModel');

exports.index = (req, res) => {
  return res.render('login');
};

exports.register = async function (req, res) {
  try {
    const login = new Login(req.body);
    await login.register();

    if (login.errors.length > 0) {
      //flash com lista de errors
      return res.redirect(req.get("Referrer"));
    }
    //flash avisando que o usuario foi criado
    return res.redirect(req.get("Referrer"));

  } catch (e) {
    console.log(e);
    return res.render('404');
  }
};

exports.login = async function (req, res) {
  try {
    const login = new Login(req.body);
    await login.login();

    if (login.errors.length > 0) {
      // res.cookie('error',login.errors.join(';'), {maxAge: 60 * 60 * 24 * 7 })
      return res.redirect('/login');
    }

    console.log('Log do login antes da declaração: ', res.locals.user, '*****', login.user)
    res.locals.user = login.user;
    console.log('Log do login depois da declaração: ', res.locals.user, '*****', login.user)

    
    // res.cookie('success', 'Você entrou na sessão.', {maxAge: 3000});
    
    res.cookie('session', 'ativada', { maxAge: 60 * 60 * 24 * 7, path: '/' });
    res.cookie('user',res.locals.user.email,{maxAge:60 * 60 * 24 * 7})
    res.cookie('id',res.locals.user._id,{maxAge:60 * 60 * 24 * 7})

    console.log('Cookies no login: ', req.headers.cookie);

    return res.redirect('/home');

  } catch (e) {
    console.log(e);
    return res.render('404');
  }
};

exports.logout = function (req, res) {
  console.log('Cookies no logout: ', req.headers.cookie);
  res.cookie('session', 'inactive', { maxAge: 0 });
  res.cookie('user',res.locals.user.email,{maxAge:0})
  res.cookie('id',res.locals.user._id,{maxAge:0})
  res.redirect('/login/');
};

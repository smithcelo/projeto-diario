exports.checkCookie = (req, res, next) => {
  if (req.headers.cookie) {
    const headers = req.headers.cookie.split(';');
    if (headers.length >= 2)
      next();
  }
  else
    res.redirect('/login')
}

exports.setUser = (req, res, next) => {
  if (!res.locals.user)
    res.locals.user = null;

  if (req.headers.cookie && req.headers.cookie.split(';').length >= 2) {
    const cookies = req.headers.cookie.split(';');
    const cookieObj = {};
    cookies.forEach(cookie => {
      const [key, value] = cookie.trim().split('=');
      cookieObj[key] = decodeURIComponent(value); //notei que os cookies tavam findo com algum tipo de codificação. o @ tava virando %40. a sugestão pra resolver foi essa
    });
    res.locals.user = {};
    res.locals.user.email = cookieObj.user;
    res.locals.user._id = cookieObj.id.replace(/^j:/, '').replace(/"/g, ''); // o resgate do cookie tava vndo com um "j:". a sugestao pra limpar o id foi essa
  }
  next();
}

exports.midErrors = (req,res,next) => {
  
}

// exports.midErrors = (req, res, next) => {
//   res.locals.errors = req.flash('errors');
//   res.locals.success = req.flash('success');
//   next();
// };
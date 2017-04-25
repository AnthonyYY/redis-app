module.exports.csrf = function(req,res,next){
  res.locals.token = req.csrfToken();
  next();
};

module.exports.authenticated = function(req,res,next){
  res.locals.isAuthenticated = req.session.isAuthenticated;
  if(req.session.isAuthenticated){
    res.locals.user = req.session.user;
  }
  next();
};

module.exports.requireAuthentication = function(req,res,next){
  if(req.session.isAuthenticated){
    next();
  }else {
    res.redirect('/login');
  }
};

module.exports.auth = function(username,password,session){
  var isAuth = username === 'joshua' || username === 'brian';
  if(isAuth){
    session.isAuthenticated = true;
    session.user = {username: username};
  }
  return isAuth;
};

module.exports.logOut = function(session){
  session.isAuthenticated = false;
  delete session.user;
};

var util = require('../middleware/utilities');

module.exports.index = index;
module.exports.login = login;
module.exports.loginProcess = loginProcess;
module.exports.chat = chat;
module.exports.logOut = logOut;

function index(req,res){
  res.render('index',{
    title: 'Index'
  });
}

function login(req,res){
  res.render('login',{title: 'login'});
}

function loginProcess(req,res){
  var isAuth = util.auth(req.body.username,req.body.password,req.session);
  isAuth ? res.redirect('/chat') : res.redirect('/login');
}

function chat(req,res){
  res.render('chat',{title: 'chat'});
}

function logOut(req,res){
  util.logOut(req.session);
  res.redirect('/');
}

module.exports.index = index;
module.exports.login = index;
module.exports.loginProcess = loginProcess;
module.exports.chat = chat;

function index(req,res){
  res.clearCookie('IndexCookie');
  res.render('index',{
    title: 'Index',
    cookie: JSON.stringify(req.cookies),
    session: JSON.stringify(req.session)
  });
}

function login(req,res){
  res.render('login',{title: 'login'});
}

function loginProcess(req,res){
  res.render('login process');
}

function chat(req,res){
  res.render('chat',{title: 'chat'});
}

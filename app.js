const express = require('express');
const app = express();

const partials = require('express-partials');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const csrf = require('csurf');

const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const log = require('./middleware/log');
const util = require('./middleware/utilities');

app.use(partials());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine','ejs');
app.set('view options',{defaultLayout:'layout'});
app.use(log.logger);
app.use(express.static(__dirname + '/static'));
app.use(cookieParser());
app.use(session({
  secret:'secret',
  saveUninitialized: true,
  resave: true,
  store: new RedisStore({
    url: 'redis://localhost'
  })
}));
app.use(csrf());
app.use(util.csrf);
app.use(util.authenticated);
app.get('/',routes.index);
app.get('/login',routes.login);
app.post('/login',routes.loginProcess);
app.get('/chat',[util.requireAuthentication],routes.chat);
app.get('/error',function(req,res,next){
  next(new Error('A contrived error'));
});
app.get('/logOut',routes.logOut);

app.use(errorHandler.error);
app.use(errorHandler.notFound);

app.listen(3000,function () {
  console.log('App server running on port 3000');
});

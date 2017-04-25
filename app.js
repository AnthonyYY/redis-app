const express = require('express');
const app = express();

const partials = require('express-partials');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

const config = require('./config');
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
  secret: config.secret,
  saveUninitialized: true,
  resave: true,
  store: new RedisStore({
    url: config.redisUrl
  })
}));
app.use(flash());
app.use(util.templateRoutes);
app.use(csrf());
app.use(util.csrf);
app.use(util.authenticated);
app.get('/',routes.index);
app.get(config.routes.login,routes.login);
app.post(config.routes.login,routes.loginProcess);
app.get('/chat',[util.requireAuthentication],routes.chat);
app.get('/error',function(req,res,next){
  next(new Error('A contrived error'));
});
app.get(config.routes.logout,routes.logOut);

app.use(errorHandler.error);
app.use(errorHandler.notFound);

app.listen(config.port,function () {
  console.log('App server running on port ' + config.port);
});

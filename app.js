const express = require('express');
const app = express();

const partials = require('express-partials');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const log = require('./middleware/log');

app.use(partials());
app.set('view engine','ejs');
app.set('view options',{defaultLayout:'layout'});
app.use(log.logger);
app.use(express.static(__dirname + '/static'));
app.use(cookieParser());
app.use(session({secret:'secret'}));

app.get('/',routes.index);
app.get('/login',routes.login);
app.get('/login',routes.loginProcess);
app.get('/chat',routes.chat);
app.get('/error',function(req,res,next){
  next(new Error('A contrived error'));
});

app.use(errorHandler.error);
app.use(errorHandler.notFound);

app.listen(3000,function () {
  console.log('App server running on port 3000');
})

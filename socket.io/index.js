let io = require('socket.io');
const cookie = require('cookie');
const cookieParser = require('cookie-parser');
const config = require('../config');

var socketAuth = function(socket,next){
  var handShakeData = socket.request;
  var parsedCookie = cookie.parse(handShakeData.header.cookie);
  var sid = cookieParser.signedCookie(parsedCookie['connect-sid'],config.secret);
  if(parsedCookie['connect-sid'] === sid){
    return next();
  }else{
    return next(new Error('Not Authenticated'));
  }
}

var socketConnection = function socketConnection(socket) {
  socket.emit('message',{message: 'Hey!'});
};

exports.startIo = function (server) {
  io = io.listen(server);
  let packtchat = io.of('/packtchat');
  packtchat.on('connection',socketConnection);
  return io;
};

exports.notFound = function notFound(req,res,next){
  res.status(404).send('You seem lost. You must have taken a wrong turn back there.');
};

exports.error = function(err,req,res,next){
  console.log(err);
  res.send(500,'Something broke. What did you do?');
}

/*
* GET home page.
*/
 
exports.index = function(req, res){
    var message = '';
  res.render('index',{message: message});
 
};

exports.user = function(req, res){
    var message = '';
  res.render('user',{message: message});
 
};

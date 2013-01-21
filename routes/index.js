
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index');
};

exports.partials = function(req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};

exports.captcha = function(req, res, next) {
  var c = require('captchagen'),
  captcha = c.generate();
  console.log(req.session);
  // req.session.captcha = captcha.text();
  res.type('image/png');
  res.send(captcha.buffer());
};
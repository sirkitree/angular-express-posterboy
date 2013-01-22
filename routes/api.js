// initialize our faux database
var data = {
  "posts":
    [{"text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},
     {"text": "Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus."}]
},
marked = require('marked');

// GET

exports.posts = function (req, res) {
  var posts = [];
  data.posts.forEach(function (post, i) {
    posts.push({
      id: i,
      text: marked(post.text)
    });
  });
  res.json({
    posts: posts
  });
};

exports.post = function (req, res) {
  var id = req.params.id;
  if (id >= 0 && id < data.posts.length) {
    res.json({
      post: data.posts[id]
    });
  } else {
    res.json(false);
  }
};

// POST
exports.addPost = function(req, res, next) {
  console.log(req.session);
  // the user's answer
  var theirCaptcha = req.body.captcha;
  if (!theirCaptcha) {
    return next("Missing captcha input");
  }
  if (theirCaptcha == req.session.captcha) {
    // valid human
    delete req.session.captcha;
    req.session.isHuman = true;

    // push to posts
    data.posts.push(req.body);
    res.json(req.body);
  } else {
    // invalid human
    delete req.session.isHuman;
    req.session.isHuman = false;

    // notify user that catcha is invalid
    res.end('invalid captcha');
  }
};

// PUT
exports.editPost = function(req, res) {
  var id = req.params.id;

  if (id >= 0 && id < data.posts.length) {
    data.posts[id] = req.body;
    res.json(true);
  } else {
    res.json(false);
  }
};

// DELETE
exports.deletePost = function (req, res) {
  var id = req.params.id;

  if (id >= 0 && id < data.posts.length) {
    data.posts.splice(id, 1);
    res.json(true);
  } else {
    res.json(false);
  }
};
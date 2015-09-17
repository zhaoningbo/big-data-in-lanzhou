var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var News = require('../models/news-models'),
    User = require('../models/user-models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/user', function (req, res) {
  var email = req.body.email,
      password = req.body.password;

  var md5 = crypto.createHash('md5'),
      password = md5.update(req.body.password).digest('hex');
  var newUser = new User({
    email: email,
    name: req.body.name,
    password: password
  });
  User.get(newUser.email, function (err, user) {
    if (err) {
      return res.jsonp({ result: 'error', message: err});
    }
    if (user) {
      return res.jsonp({ result: 'error', message: '邮箱以注册!'});
    }
    newUser.save(function (err, user) {
      if (err) {
        return res.jsonp({ result: 'error', message: err});
      }
      req.session.user = user;
      req.jsonp({ result:'success', message:'注册成功!'});
    });
  });
});

router.get('/news/:id',function(req,res){
  News.get(req.params.id,function(err,news){
    if(err){
      console.log(err);
    }
    res.jsonp(news);
  });
});

router.get('/news',function(req,res){
  var last = req.query.last || false;
  var num = req.query.num || 3;
  console.log(last);
  console.log(num);
  if(last) {
    News.getLast(num, function(err, news) {
      if(err) {
        console.log(err);
      } else {
        res.jsonp(news);
      }
    });
  } else {
    News.getAll(function(err,news){
      if(err){
        console.log('error');
      }else{
        res.jsonp(news);
      }
    });
  }

});


module.exports = router;
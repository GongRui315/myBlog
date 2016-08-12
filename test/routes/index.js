var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = require('../models/user').user;
mongoose.connect('mongodb://119.29.225.198/admin');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '肉鸽的愉悦生活.blog' });
});
/*login*/
router.get('/login', function(req, res) {
  res.render('login', { title: '肉鸽的愉悦生活.blog' });
});

/*logout*/
router.get('/logout', function(req, res) {
  res.render('logout', { title: 'logout' });
});

/*hompage*/
router.post('/homepage', function(req, res) {
  var query_doc = {userid: req.body.userid, password: req.body.password};
  (function(){
    user.count(query_doc, function(err, doc){
      if(doc == 1){
        console.log(query_doc.userid + ": login success in " + new Date());
        res.render('homepage', { title: '肉鸽的愉悦生活.blog' });
      }else{
        console.log(query_doc.userid + ": login failed in " + new Date());
        res.redirect('/');
      }
    });
  })(query_doc);
});
/**
 * get all articles
 */
router.post('/getAllArticles',function(req,res){
  var url = "mongodb://119.29.225.198/admin";
  var collection_name = "article";
  var condition = {};

  MongoClient.connect(url, function (err, db) {
    if(err) console.log("connection error");
    var collection = db.collection(collection_name);
    // console.log(collection.find(condition));
    collection.find(condition).toArray(function (err, result) {
      //console.log(url + '/' + collection_name);
      if(err) {
        console.log(err);
        console.log("result error");
        return res.send(":-/");
      }
      if(!result) return res.send(":-/ :-/");
      //console.log("result error");
      //console.log(result);
      res.send(result);
      db.close();
    });
    // process.exit();
  });
});
/**
 * jump to new article
 */
router.get('/newArticle', function (req, res) {
  res.render('newArticle', { title: '撰写新文章' });
});
/**
 * add article
 */
router.post('/newArticle',function(req,res){
    var time = new Date();
    var timeId = time.getTime();
    var query_doc = {art_id:timeId,title: req.body.title, content: req.body.content,author:"gongrui",comments:[]};
    var url = "mongodb://119.29.225.198/admin";
    var collection_name = "article";
    MongoClient.connect(url, function (err, db){
    if(err) { return console.dir(err); }
        db.collection(collection_name).insert(query_doc);
        res.render('homepage', { title: '肉鸽的愉悦生活.blog' });
        db.close();
    });
});
/**
 * jump to edit article
 */
router.get('/editArticle', function (req, res) {
    var id=req.query.id;
    res.render('editArticle', { title: '编辑文章',art_id:id });
});
/**
 * show edit article
 */
router.post('/showArticle',function(req,res){
    var url = "mongodb://119.29.225.198/admin";
    var collection_name = "article";

    var id=req.query.art_id;

    var condition = {};
    if (id) condition.id = parseInt(id);

    MongoClient.connect(url, function(err, db) {
        if (err) console.log('connection error');
        var collection = db.collection(collection_name);
        collection.find(condition).toArray(function(err, result) {
            if (err) {
                console.log(err);
                return res.send('233');
            }
            if (!result) return res.send('2333');

            res.send(result);
            db.close();
        });
    });
});
module.exports = router;

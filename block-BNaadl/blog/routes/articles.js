var express = require('express');
var router = express.Router();
const Article = require('../models/Article');

/* GET users listing. */
router.get('/', (req, res, next) => {
  User.find({}, (err, articles) => {
    console.log(err, articles);
    if (err) return next(err);
    res.render('listArticles.ejs', { articles });
  });
});

router.get('/new', (req, res, next) => {
  res.render('articleForm.ejs');
  console.log(req.body);
  if (err) return next(err);
  res.send(req.body);
});

router.post('/', (req, res, next) => {
  User.create(req.body, (err, createdUser) => {
    if (err) return res.redirect('/articles/new');
    res.redirect('/articles');
  });
});

router.get('/:id', (req, res, next) => {
  var id = req.params.id;
  User.findById(id, (err, user) => {
    console.log(user);
    if (err) return next(err);
    res.render('singleArticles', { article });
  });
});

router.get('/:id/edit', (req, res, next) => {
  var id = req.params.id;
  User.findById(id, (err, user) => {
    console.log(user);
    if (err) return next(err);
    res.render('updateArticleForm', { article });
  });
});

router.post('/:id', (req, res, next) => {
  var id = req.params.id;
  User.findByIdAndUpdate(id, req.body, (err, user) => {
    if (err) return next(err);
    res.redirect('/articles');
  });
});

router.get('/:id/delete', (req, res, next) => {
  var id = req.params.id;
  User.findByIdAndDelete(id, (err, user) => {
    if (err) return next(err);
    res.redirect('/articles');
  });
});

module.exports = router;

var express = require('express');
var router = express.Router();
const Article = require('../models/Article');
const Comment = require('../models/Comment');

/* GET users listing. */
router.get('/', (req, res, next) => {
  Article.find({}, (err, articles) => {
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
  Article.create(req.body, (err, createdArticle) => {
    if (err) return res.redirect('/articles/new');
    res.redirect('/articles');
  });
});

router.get('/:id', (req, res, next) => {
  var id = req.params.id;
  Article.findById(id, (err, article) => {
    if (err) return next(err);
    Comment.find({ bookId: id }, (err, comments) => {
      res.render('singleArticle', { article }, { comments });
    });
  });
});

router.get('/:id/edit', (req, res, next) => {
  var id = req.params.id;
  Article.findById(id, (err, article) => {
    console.log(article);
    if (err) return next(err);
    res.render('updateArticleForm', { article });
  });
});

router.post('/:id', (req, res, next) => {
  var id = req.params.id;
  Article.findByIdAndUpdate(id, req.body, (err, article) => {
    if (err) return next(err);
    res.redirect('/articles');
  });
});

router.get('/:id/delete', (req, res, next) => {
  var id = req.params.id;
  Article.findByIdAndDelete(id, (err, article) => {
    if (err) return next(err);
    res.redirect('/articles');
  });
});

router.get('/:id/likes', (req, res, next) => {
  var id = req.params.id;
  Article.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (err, article) => {
    if (err) return next(err);
    res.redirect('/articles' + id);
  });
});

router.get('/:id/dislikes', (req, res, next) => {
  var id = req.params.id;
  Article.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (err, article) => {
    if (err) return next(err);
    res.redirect('/articles' + id);
  });
});

router.post('/:id/comments', (req, res, next) => {
  console.log(req.body);
  var id = req.params.id;
  req.body.bookId = id;
  Comment.create(req.body, (err, comment) => {
    console.log(err, comment);
    if (err) return next(err);
    res.redirect('/articles/' + id);
  });
});

module.exports = router;

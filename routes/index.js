var express = require('express');
var router = express.Router();
const bookController = require('../controllers/bookController');
const authorController = require('../controllers/authorController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/books', bookController.viewAll);
router.get('/books/profile/:id', bookController.viewProfile);
router.get('/books/edit/:id', bookController.renderEditForm);
router.get('/books/add', bookController.renderAddForm);
router.get('/books/delete/:id', bookController.deleteBook);
router.get('/authors', authorController.viewAll);
router.get('/authors/profile/:id', authorController.viewProfile);
router.get('/authors/edit/:id', authorController.renderEditForm);
router.get('/authors/add', authorController.renderAddForm);
router.get('/authors/delete/:id', authorController.deleteAuthor);

router.post('/books/edit/:id', bookController.updateBook);
router.post('/books/add', bookController.addBook);
router.post('/authors/edit/:id', authorController.updateAuthor);
router.post('/authors/add', authorController.addAuthor);

module.exports = router;
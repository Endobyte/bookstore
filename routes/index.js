var express = require('express');
var router = express.Router();
const bookController = require('../controllers/bookController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/books', bookController.viewAll);
router.get('/books/profile/:id', bookController.viewProfile);
router.get('/books/edit/:id', bookController.renderEditForm);
router.get('/books/add', bookController.renderAddForm);
router.get('/books/delete/:id', bookController.deleteBook);

router.post('/books/edit/:id', bookController.updateBook);
router.post('/books/add', bookController.addBook);

module.exports = router;
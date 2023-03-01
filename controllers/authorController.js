const {Author, Book, AuthorBooks} = require('../models');

// view all
module.exports.viewAll = async function (req, res) {
    const authors = await Author.findAll();
    res.render('author/view_all', {authors});
}

// profile
module.exports.viewProfile = async function (req, res) {
    const author = await Author.findByPk(req.params.id, {
        include: 'books'
    });
    const books = await Book.findAll();
    let availableBooks = [];
    for (let i = 0; i < books.length; i++) {
        if (!authorHasBook(author, books[i])) {
            availableBooks.push(books[i]);
        }
    }
    res.render('author/profile', {author, availableBooks})
}

// render add form
module.exports.renderAddForm = async function (req, res) {
    const author = {
        firstname: '',
        lastname: '',
        dob: ''
    }
    res.render('author/add', {author});
}

// add
module.exports.addAuthor = async function (req, res) {
    const author = await Author.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        dob: req.body.dob
    });
    res.redirect(`/authors/profile/${author.id}`);
}

// render edit form
module.exports.renderEditForm = async function (req, res) {
    const author = await Author.findByPk(req.params.id);
    res.render('author/edit', {author});
}

// update
module.exports.updateAuthor = async function (req, res) {
    const author = await Author.update({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        dob: req.body.dob
    }, {
        where: {
            id: req.params.id
        }
    })
    res.redirect(`/authors/profile/${req.params.id}`);
}

// delete
module.exports.deleteAuthor = async function (req, res) {
    await Author.destroy({
        where: {
            id: req.params.id
        }
    });
    res.redirect('/authors');
}

// add book to author
module.exports.writeAuthor = async function (req, res) {
    await AuthorBooks.create({
        author_id: req.params.authorId,
        book_id: req.body.book
    })
    res.redirect(`/authors/profile/${req.params.authorId}`)
}

// delete book from author
module.exports.removeBook = async function (req, res) {
    await AuthorBooks.destroy({
        where: {
            author_id: req.params.authorId,
            book_id: req.params.bookId
        }
    })
    res.redirect(`/authors/profile/${req.params.authorId}`)
}

function authorHasBook (author, book) {
    for (let i = 0; i < author.books.length; i++) {
        if (book.id === author.books[i].id) {
            return true
        }
    }
    return false
}
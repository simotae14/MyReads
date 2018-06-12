import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types';

const Books = (props) => (
    <div className="bookshelf-books">
        <ol className="books-grid">
            { props.books.map((book) => (
                <Book
                    key={book.id}
                    book={book}
                    shelf={book.shelf}
                    onBookshelfChange={props.onBookshelfChange}
                />
            )) }
        </ol>
    </div>
);

Books.propTypes = {
    onBookshelfChange: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired
}

export default Books;
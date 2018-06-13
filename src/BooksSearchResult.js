import React from 'react'
import PropTypes from 'prop-types';
import Book from './Book'

const BooksSearchResult = (props) => {
    return(
        <ol className="books-grid">
            { props.searchedBooks.slice(0, props.numberResults).map((book) => {
                return (
                <Book
                    key={book.id}
                    book={book}
                    shelf={book.shelf}
                    onBookshelfChange={props.onBookshelfChange}
                />
            )}) }
        </ol>
    );
}

BooksSearchResult.propTypes = {
    onBookshelfChange: PropTypes.func.isRequired,
    numberResults: PropTypes.number.isRequired,
    searchedBooks: PropTypes.array.isRequired
}

export default BooksSearchResult;
import React from 'react'
import Books from './Books'
import PropTypes from 'prop-types';

const Bookshelf = (props) => (
    <div className="bookshelf">
        <h2 className="bookshelf-title">{props.title}</h2>
        <Books
            books={props.books}
            onBookshelfChange={props.onBookshelfChange}
        />
    </div>
);

Bookshelf.propTypes = {
    title: PropTypes.string.isRequired,
    onBookshelfChange: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired
}

export default Bookshelf;
import React from 'react'
import PropTypes from 'prop-types';

const Book = (props) => {
    const imageUrl = props.book && props.book.imageLinks && props.book.imageLinks.thumbnail;
    const divStyle = {
        width: 128,
        height: 193,
        backgroundImage: `url(${imageUrl})`
    }
    return(
        <li>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={divStyle}></div>
                    <div className="book-shelf-changer">
                        <select
                            value={props.shelf}
                            onChange={(event) => props.onBookshelfChange(props.book, event.target.value)}
                        >
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{props.book.title}</div>
                <div className="book-authors">{props.book.authors ? props.book.authors.join(', ') : ''}</div>
            </div>
        </li>
    )
};

Book.propTypes = {
    onBookshelfChange: PropTypes.func.isRequired,
    book: PropTypes.object.isRequired,
    shelf: PropTypes.string.isRequired
}

export default Book;
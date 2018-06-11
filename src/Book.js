import React from 'react'

const Book = (props) => {
const imageUrl = props.book.imageLinks.thumbnail;
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
                    <select>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{props.book.title}</div>
            <div className="book-authors">{props.book.authors.join(', ')}</div>
        </div>
    </li>
)};

export default Book;
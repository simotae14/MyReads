import React from 'react'
import Books from './Books'

const Bookshelf = (props) => (
    <div className="bookshelf">
        <h2 className="bookshelf-title">{props.title}</h2>
        <Books books={props.books} />
    </div>
);

export default Bookshelf;
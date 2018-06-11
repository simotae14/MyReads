import React from 'react'
import Bookshelf from './Bookshelf'

const ListBooks = (props) => {
    const currentlyBooks = props.books.filter(book => book.shelf === 'currentlyReading');
    const wantToReadBooks = props.books.filter(book => book.shelf === 'wantToRead');
    const readBooks = props.books.filter(book => book.shelf === 'read');

    return (
    <div className="list-books">
        <div className="list-books-title">
            <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
            <div>
                {
                    currentlyBooks.length > 0 && (
                        <Bookshelf
                            books={currentlyBooks}
                            title={'Currently Reading'}
                            onBookshelfChange={props.onBookshelfChange}
                        />
                    )
                }
                {
                    wantToReadBooks.length > 0 && (
                        <Bookshelf
                            books={wantToReadBooks}
                            title={'Want to Read'}
                            onBookshelfChange={props.onBookshelfChange}
                        />
                    )
                }
                {
                    readBooks.length > 0 && (
                        <Bookshelf
                            books={readBooks}
                            title={'Read'}
                            onBookshelfChange={props.onBookshelfChange}
                        />
                    )
                }
            </div>
        </div>
        <div className="open-search">
            <a onClick={() => props.onClickSearch()}>Add a book</a>
        </div>
    </div>
)};

export default ListBooks;
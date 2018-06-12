import React from 'react'
import { Link } from 'react-router-dom';
import Book from './Book'
import * as BooksAPI from './BooksAPI';
import {DebounceInput} from 'react-debounce-input';
import PropTypes from 'prop-types';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            searchedBooks: [],
            error: false,
            numberResults: 20
        };
    }
    static propTypes = {
        onBookshelfChange: PropTypes.func.isRequired,
        books: PropTypes.array.isRequired
    };
    handleSearchTextChange = (event) => {
        this.setState({
            text: event.target.value
        });
        if(event.target.value !== '') {
            BooksAPI.search(event.target.value, this.state.numberResults)
            .then((results) => {
                if(results && results.error) {
                    this.setState({
                        error: true
                    })
                } else {
                    // search if searched books are already on the books list
                    // and synchronize book sghelf status on the searched books
                    // for each book on the shelf
                    this.props.books.forEach(book => {
                        // find if book with the same ID is included in searchResults
                        let bookOnShelf = results.find((result) => result.id === book.id);
                        // and if so update the shelf property
                        if (bookOnShelf) {
                            bookOnShelf.shelf = book.shelf
                        }
                    });
                    this.setState({
                        searchedBooks: results,
                        error: false
                    })
                }
            });
        } else {
            this.setState({
                searchedBooks: [],
                error: false
            })
        }
    }
    getShelf = (bookId) => {
        BooksAPI.get(bookId)
            .then((book) => {
                return book.shelf;
            });
    }
    setNumberResults = (event) => {
        const maxValue = parseInt(event.target.innerText);
        this.setState({
            numberResults: maxValue
        })
    }
    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        to='/'
                        className='close-search'
                    >
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        <DebounceInput
                            type="text"
                            placeholder="Search by title or author"
                            debounceTimeout={300}
                            value={this.state.text}
                            onChange={this.handleSearchTextChange}
                        />
                    </div>
                </div>
                { this.state.error ? (
                    <div className="search-books-results">
                        <h1>Error! Search an author or a title existent</h1>
                    </div>
                ) : (
                    <div className="search-books-results result-wrapper">
                        <ol className="books-grid">
                            { this.state.searchedBooks.slice(0, this.state.numberResults).map((book) => {
                                return (
                                <Book
                                    key={book.id}
                                    book={book}
                                    shelf={book.shelf}
                                    onBookshelfChange={this.props.onBookshelfChange}
                                />
                            )}) }
                        </ol>
                        <div className="add-button">
                            <div className="sub-button tl" onClick={this.setNumberResults}>5</div>
                            <div className="sub-button tr" onClick={this.setNumberResults}>10</div>
                            <div className="sub-button bl" onClick={this.setNumberResults}>15</div>
                            <div className="sub-button br" onClick={this.setNumberResults}>20</div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default Search;
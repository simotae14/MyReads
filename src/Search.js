import React from 'react'
import SearchBar from './SearchBar'
import MaxResultsButton from './MaxResultsButton'
import BooksSearchResult from './BooksSearchResult'
import * as BooksAPI from './BooksAPI';
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
        const maxValue = parseInt(event.target.innerText, 10);
        this.setState({
            numberResults: maxValue
        })
    }
    render() {
        return (
            <div className="search-books">
                <SearchBar
                    text={this.state.text}
                    handleSearchTextChange={this.handleSearchTextChange}
                />
                { this.state.error ? (
                    <div className="search-books-results">
                        <h1>Error! Search an author or a title existent</h1>
                    </div>
                ) : (
                    <div className="search-books-results result-wrapper">
                        <BooksSearchResult
                            searchedBooks={this.state.searchedBooks}
                            numberResults={this.state.numberResults}
                            onBookshelfChange={this.props.onBookshelfChange}
                         />
                        <MaxResultsButton
                            setNumberResults={this.setNumberResults}
                            numberResults={this.state.numberResults}
                         />
                    </div>
                )}
            </div>
        );
    }
}

export default Search;
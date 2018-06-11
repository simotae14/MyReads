import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './Search';
import ListBooks from './ListBooks';
import * as BooksAPI from './BooksAPI';
class BooksApp extends React.Component {
  state = {
    books: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  getBooks = () => {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({
          books
        })
      });
  }

  componentDidMount() {
    this.getBooks();
  }

  onBookshelfChange = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then((book, shelf) => {
        this.getBooks();
      });
  }

  onClickBack = () => {
    this.setState(() => ({
      showSearchPage: false
    }));
  }

  onClickSearch = () => {
    this.setState(() => ({
      showSearchPage: true
    }));
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Search onClickBack={this.onClickBack} />
        ) : (
          <ListBooks
            onClickSearch={this.onClickSearch}
            onBookshelfChange={this.onBookshelfChange}
            books={this.state.books}
          />
        )}
      </div>
    )
  }
}

export default BooksApp

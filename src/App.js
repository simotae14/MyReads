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

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        console.log('BOOKS', books);
        console.log('categorie', books.map(book => book.shelf)
        .filter((value, index, self) => self.indexOf(value) === index)
      );
        this.setState({
          books
        })
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
          <ListBooks onClickSearch={this.onClickSearch} books={this.state.books} />
        )}
      </div>
    )
  }
}

export default BooksApp

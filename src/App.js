import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './Search';
import ListBooks from './ListBooks';
import * as BooksAPI from './BooksAPI';
import { Route } from 'react-router-dom';
import _ from 'lodash';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  getBooks = _.debounce(() => {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({
          books
        })
      });
  });

  componentDidMount() {
    this.getBooks();
  }

  onBookshelfChange = _.debounce((book, shelf) => {
    BooksAPI.update(book, shelf)
      .then((book, shelf) => {
        this.getBooks();
      });
  });

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <Search
            onBookshelfChange={this.onBookshelfChange}
            books={this.state.books}
          />
        )} />
        <Route exact path='/' render={() => (
          <ListBooks
            onBookshelfChange={this.onBookshelfChange}
            books={this.state.books}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp

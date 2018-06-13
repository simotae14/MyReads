import React from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {DebounceInput} from 'react-debounce-input';

const SearchBar = (props) => {
    return(
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
                    value={props.text}
                    onChange={props.handleSearchTextChange}
                />
            </div>
        </div>
    );
}

SearchBar.propTypes = {
    text: PropTypes.string.isRequired,
    handleSearchTextChange: PropTypes.func.isRequired
}

export default SearchBar;
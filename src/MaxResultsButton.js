import React from 'react'
import PropTypes from 'prop-types';

const MaxResultsButton = (props) => {
    return(
        <div className="max-button">
            <div
                className={props.numberResults === 5  ? 'sub-button tl selected': 'sub-button tl'}
                onClick={props.setNumberResults}
            >5</div>
            <div
                className={props.numberResults === 10  ? 'sub-button tr selected': 'sub-button tr'}
                onClick={props.setNumberResults}
            >10</div>
            <div
                className={props.numberResults === 15  ? 'sub-button bl selected': 'sub-button bl'}
                onClick={props.setNumberResults}
            >15</div>
            <div
                className={props.numberResults === 20  ? 'sub-button br selected': 'sub-button br'}
                onClick={props.setNumberResults}
            >20</div>
        </div>
    );
}

MaxResultsButton.propTypes = {
    setNumberResults: PropTypes.func.isRequired,
    numberResults: PropTypes.number.isRequired,
    shelf: PropTypes.string
}

export default MaxResultsButton;
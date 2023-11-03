import React from 'react';
import CSS from './LoadMoreButton.module.css';
import PropTypes from 'prop-types';

function LoadMoreButton(props) {
  return (
    <>
      {props.images.length > 0 && (
        <button
          className={CSS.loaderButton}
          type="button"
          onClick={props.handleLoadMore}
        >
          Load More
        </button>
      )}
    </>
  );
}

LoadMoreButton.propTypes = {
  images: PropTypes.array.isRequired,
  handleLoadMore: PropTypes.func.isRequired,
};

export default LoadMoreButton;

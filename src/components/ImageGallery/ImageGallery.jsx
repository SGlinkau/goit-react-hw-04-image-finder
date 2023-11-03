import React from 'react';
import { RotatingLines } from 'react-loader-spinner';
import CSS from './ImageGallery.module.css';
import PropTypes from 'prop-types';

function ImageGallery({ isEmptySearchQuery, isLoading, images, openModal }) {
  return (
    <section className={CSS.gallery}>
      {isEmptySearchQuery ? (
        <p>Please provide input above!</p>
      ) : isLoading ? (
        <RotatingLines type="Oval" color="#0a7cff" height={100} width={100} />
      ) : (
        <ul className={CSS.galleryList}>
          {images.length > 0 ? (
            images.map((image, index) => (
              <li className={CSS.galleryItem} key={index}>
                <img
                  className={CSS.galleryImage}
                  src={image.previewURL}
                  alt={image.tags}
                  onClick={() => openModal(image.largeImageURL)}
                />
              </li>
            ))
          ) : (
            <p>Enter what pictures you would like to see</p>
          )}
        </ul>
      )}
    </section>
  );
}

ImageGallery.propTypes = {
  isEmptySearchQuery: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  images: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGallery;

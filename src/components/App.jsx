import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar/SearchBar.jsx';
import ImageGallery from './ImageGallery/ImageGallery.jsx';
import LoadMoreButton from './LoadMoreButton/LoadMoreButton.jsx';
import ImageModal from './Modal/Modal.jsx';

const getImagesFromPixabay = async (
  searchQuery,
  currentPage,
  setImages,
  setIsLoading,
  setIsSearched
) => {
  setIsLoading(true);
  try {
    const apiKey = '40228040-e1deee2d1dbd5acbce038e379';
    const page = currentPage;
    const perPage = 12;
    const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${searchQuery}&image_type=photo&orientation=horizontal&page=${page}&per_page=${perPage}`;

    const response = await axios.get(apiUrl);

    if (response.data.hits) {
      const newImages = response.data.hits;
      setImages(prevImages => [...prevImages, ...newImages]);
      setIsLoading(false);
      setIsSearched(true);
    }
  } catch (error) {
    console.error('Błąd podczas pobierania obrazów z Pixabay', error);
    setIsLoading(false);
    setIsSearched(true);
  }
};

const App = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEmptySearchQuery, setIsEmptySearchQuery] = useState(false);

  useEffect(() => {
    if (isSearched) {
      getImagesFromPixabay(
        searchQuery,
        currentPage,
        setImages,
        setIsLoading,
        setIsSearched
      );
    }
  }, [
    currentPage,
    isSearched,
    searchQuery,
    setImages,
    setIsLoading,
    setIsSearched,
  ]);

  const handleSearch = query => {
    setImages([]);
    setSearchQuery(query);
    setIsSearched(true);
    setCurrentPage(1);
  };

  const handleLoadMore = () => {
    if (searchQuery.trim() === '') {
      setIsEmptySearchQuery(true);
    } else {
      setCurrentPage(prevPage => prevPage + 1);
      setIsEmptySearchQuery(false);
    }
  };

  const handleClear = () => {
    setImages([]);
    setSearchQuery('');
    setIsSearched(false);
    setCurrentPage(1);
    setIsEmptySearchQuery(false);
  };

  const openModal = image => {
    setIsModalOpen(true);
    setSelectedImage(image);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="App">
      <SearchBar
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        handleClear={handleClear}
      />

      <ImageGallery
        images={images}
        isEmptySearchQuery={isEmptySearchQuery}
        isLoading={isLoading}
        openModal={openModal}
      />

      <LoadMoreButton handleLoadMore={handleLoadMore} images={images} />

      <ImageModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        selectedImage={selectedImage}
      />
    </div>
  );
};

App.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleClear: PropTypes.func.isRequired,
};

export default App;

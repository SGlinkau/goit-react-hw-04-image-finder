import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar/SearchBar.jsx';
import ImageGallery from './ImageGallery/ImageGallery.jsx';
import LoadMoreButton from './LoadMoreButton/LoadMoreButton.jsx';
import ImageModal from './Modal/Modal.jsx';

export class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    isLoading: false,
    isSearched: false,
    currentPage: 1,
    isModalOpen: false,
    selectedImage: null,
    isEmptySearchQuery: false,
  };

  getImagesFromPixabay = async () => {
    this.setState({ isLoading: true });
    try {
      const apiKey = '40228040-e1deee2d1dbd5acbce038e379';
      const searchQuery = this.state.searchQuery;
      const page = this.state.currentPage;
      const perPage = 12;
      const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${searchQuery}&image_type=photo&orientation=horizontal&page=${page}&per_page=${perPage}`;

      const response = await axios.get(apiUrl);

      if (response.data.hits) {
        const newImages = response.data.hits;
        const images = [...this.state.images, ...newImages];
        this.setState({ images, isLoading: false, isSearched: true });
      }
    } catch (error) {
      console.error('Błąd podczas pobierania obrazów z Pixabay', error);
      this.setState({ isLoading: false, isSearched: true });
    }
  };

  handleSearch = query => {
    this.setState(
      {
        images: [],
        searchQuery: query,
        isSearched: true,
        currentPage: 1,
      },
      () => {
        this.getImagesFromPixabay();
      }
    );
  };

  handleLoadMore = () => {
    if (this.state.searchQuery.trim() === '') {
      return;
    } else {
      this.setState(prevState => ({
        currentPage: prevState.currentPage + 1,
        isEmptySearchQuery: false,
      }));
      this.getImagesFromPixabay();
    }
  };

  handleClear = () => {
    this.setState({
      images: [],
      searchQuery: '',
      isSearched: false,
      currentPage: 1,
    });
  };

  openModal = image => {
    this.setState({ isModalOpen: true, selectedImage: image });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false, selectedImage: null });
  };

  handleInputChange = query => {
    this.setState({ searchQuery: query, isSearched: false });
  };

  render() {
    return (
      <div className="App">
        <SearchBar
          searchQuery={this.state.searchQuery}
          handleSearch={this.handleSearch}
          handleClear={this.handleClear}
        />

        <ImageGallery
          images={this.state.images}
          isEmptySearchQuery={this.state.isEmptySearchQuery}
          isLoading={this.state.isLoading}
          openModal={this.openModal}
        />

        <LoadMoreButton
          handleLoadMore={this.handleLoadMore}
          images={this.state.images}
        />

        <ImageModal
          isModalOpen={this.state.isModalOpen}
          closeModal={this.closeModal}
          selectedImage={this.state.selectedImage}
        />
      </div>
    );
  }
}

SearchBar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleClear: PropTypes.func.isRequired,
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  isEmptySearchQuery: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
};

LoadMoreButton.propTypes = {
  handleLoadMore: PropTypes.func.isRequired,
  images: PropTypes.array.isRequired,
};

ImageModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  selectedImage: PropTypes.string,
};

export default App;

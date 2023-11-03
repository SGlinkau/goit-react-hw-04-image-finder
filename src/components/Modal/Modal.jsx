import React from 'react';
import Modal from 'react-modal';
import CSS from './Modal.module.css';
import PropTypes from 'prop-types';

function ImageModal({ isModalOpen, closeModal, selectedImage }) {
  return (
    <Modal
      className={CSS.Modal}
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel="Image Modal"
    >
      {selectedImage && <img src={selectedImage} alt="Selected" />}
    </Modal>
  );
}

ImageModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  selectedImage: PropTypes.string,
};

export default ImageModal;

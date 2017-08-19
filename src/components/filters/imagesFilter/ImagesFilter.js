import PropTypes from 'prop-types';
import React from 'react';
import Filter from '../filter/Filter';
import ImageInput from '../../inputs/fileInputs/imageInput/ImageInputContainer';
import { imagesContainer } from './imagesFilter.css';

const getImages = ({ urls, maxImages, onAdd, onDelete }) => {
  if (maxImages <= 0) {
    return undefined;
  }

  const images = Array.from({ length: maxImages }, (elem, index) => (
    <ImageInput
      key={index}
      url={urls[index] ? urls[index] : ''}
      id={index}
      onAdd={image => onAdd(index, image)}
      onDelete={() => onDelete(index)}
    />
  ));

  return images;
};

const ImageFilter = ({ error, ...imagesProps }) =>
  (
    <Filter title="Pictures" error={error} >
      <div className={imagesContainer} >
        {getImages(imagesProps)}
      </div >
    </Filter >
  );

ImageFilter.propTypes = {
  urls: PropTypes.objectOf(PropTypes.string),
  error: PropTypes.string,
  maxImages: PropTypes.number.isRequired,
  onAdd: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

ImageFilter.defaultProps = {
  urls: [],
  error: '',
};

export default ImageFilter;


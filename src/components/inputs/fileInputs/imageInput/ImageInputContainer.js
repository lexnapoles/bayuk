import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ImageInput from './ImageInput';

class ImageInputContainer extends Component {
  static isAnImage(file) {
    return /^image\//.test(file.type);
  }

  static loadImage(img) {
    return new Promise(((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = event => resolve(event.target.result);
      reader.onerror = event => reject(event.target.error);

      reader.readAsDataURL(img);
    }));
  }

  constructor(props) {
    super(props);

    this.onAdd = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onAdd(event) {
    const selectedFile = event.target.files[0];

    if (!ImageInputContainer.isAnImage(selectedFile)) {
      return;
    }

    ImageInputContainer.loadImage(selectedFile)
      .then((url) => {
        this.props.onAdd(url);
      });
  }

  onDelete() {
    this.props.onDelete();
  }

  render() {
    return (
      <ImageInput
        url={this.props.url}
        onAdd={this.onAdd}
        onDelete={this.onDelete}
        id={this.props.id}
      />
    );
  }
}

ImageInputContainer.propTypes = {
  url: PropTypes.string,
  id: PropTypes.number.isRequired,
  onAdd: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

ImageInputContainer.defaultProps = {
  url: '',
};

export default ImageInputContainer;

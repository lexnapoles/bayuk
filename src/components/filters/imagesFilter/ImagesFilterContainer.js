import PropTypes from "prop-types";
import React, { Component } from "react";
import ImagesFilter from "./ImagesFilter";

class ImagesFilterContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: {}
    };

    this.onAddImage = this.onAddImage.bind(this);
    this.onDeleteImage = this.onDeleteImage.bind(this);
  }

  onAddImage(position, image) {
    const images = { ...this.state.images, [position]: image };

    this.setState({ images });

    this.props.onChange(Object.values(images));
  }

  onDeleteImage(position) {
    const images = { ...this.state.images };

    Reflect.deleteProperty(images, position);

    this.setState({ images });

    this.props.onChange(Object.values(images));
  }

  render() {
    return (
      <ImagesFilter
        urls={this.state.images}
        error={this.props.error}
        maxImages={this.props.maxImages}
        onAdd={this.onAddImage}
        onDelete={this.onDeleteImage}
      />
    );
  }
}

ImagesFilterContainer.propTypes = {
  maxImages: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired
};

export default ImagesFilterContainer;

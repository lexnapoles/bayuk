import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import AddIcon from '../icons/addIcon/AddIcon';
import { linkReset } from '../global.css';
import { btnText } from './addProductBtn.css';

const AddProductBtn = ({ className }) => (
  <Link className={`${linkReset} ${className}`} to={'/add'} >
    <AddIcon />
    <p className={btnText} >Add Product</p >
  </Link >
);

AddProductBtn.propTypes = {
  className: PropTypes.string,
};

AddProductBtn.defaultProps = {
  className: '',
};

export default AddProductBtn;

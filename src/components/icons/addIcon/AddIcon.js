import React from 'react';
import { Link } from 'react-router';
import Icon from 'react-fa';
import { addIcon } from './addIcon.css';

const AddIcon = () =>
  (<Link className={addIcon} to={'/add'}>
    <Icon name="plus-circle" size="4x" />
  </Link>);

export default AddIcon;

import React from 'react';
import { Link } from 'react-router';
import Icon from 'react-fa';
import { searchIcon } from './searchIcon.css';

const SearchIcon = () =>
  (<Link to={'/search'}>
    <Icon name="search" size="lg" className={searchIcon} />
  </Link>);

export default SearchIcon;

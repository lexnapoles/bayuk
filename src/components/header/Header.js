import PropTypes from 'prop-types';
import React from 'react';
import { header, nav } from './header.css';

const Header = ({ children }) =>
  (<header className={header} >
    <nav className={nav} >
      {children}
    </nav >
  </header >);

Header.propTypes = {
  children: PropTypes.node,
};

Header.defaultProps = {
  children: '',
};

export default Header;

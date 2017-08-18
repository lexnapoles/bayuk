import React from 'react';
import ReturnIcon from '../../../icons/returnIcon/ReturnIcon';
import SearchIcon from '../../../icons/searchIcon/SearchIcon';
import Header from '../../../header/Header';
import { returnIcon, searchIcon } from './resultsHeader.css';

const ResultHeader = () =>
  (<Header>
    <div className={returnIcon}>
      <ReturnIcon url="/" />
    </div>
    <div className={searchIcon}>
      <SearchIcon />
    </div>
  </Header>);

export default ResultHeader;

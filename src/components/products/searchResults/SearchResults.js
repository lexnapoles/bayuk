import React from 'react';
import { container, main } from '../../layout.css';
import ResultsHeader from './resultsHeader/ResultsHeader';
import SearchedProducts from '../searchedProducts/SearchedProducts';

const SearchResults = () => (
  <div className={container} >
    <ResultsHeader />
    <main className={main} >
      <SearchedProducts />
    </main >
  </div >
);

export default SearchResults;

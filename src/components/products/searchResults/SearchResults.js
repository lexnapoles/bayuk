import React from 'react';
import { container, main } from '../../layout.css';
import ResultsHeader from './resultsHeader/ResultsHeader';
import ProductsByFilter from '../productsByFilter/ProductsByFilter';
import { CUSTOM_FILTER } from '../../../constants/productFilters';

const SearchResults = () => (
  <div className={container} >
    <ResultsHeader />
    <main className={main} >
      <ProductsByFilter filter={CUSTOM_FILTER} />
    </main >
  </div >
);

export default SearchResults;

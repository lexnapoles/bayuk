import React from 'react';
import { container } from './notFound.css';

const NotFound = (message = '') => (
  <div className={container}>
    {message.length ? <h1>message</h1> : <h1>Sorry, this product could not be found</h1>}
  </div>
);

export default NotFound;

import React, {useState} from 'react';
import {Movies} from '../movies';
import {Link} from 'react-router-dom';
import './genreItem.css';

export const GenreItem = ({items}) => {
  const [styles, setStyles] = useState(true);

  return (
    <div className={'genreLinks'}>
      <Link
        style={{display: styles ? 'inline' : 'none'}}
        to={`/movies/genre/${items.name}`}>
        {items.name} <span>(view more)</span>
      </Link>
      <Movies name={items.name} setStyles={setStyles} />
    </div>
  );
};

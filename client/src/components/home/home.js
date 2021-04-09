import React from 'react';
import './home.css';
import {GenreList} from './genreList';

export const Home = () => {
  return (
    <div className={'homePage'}>
      <GenreList />
    </div>
  );
};

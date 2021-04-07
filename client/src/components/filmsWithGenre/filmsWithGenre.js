import React from 'react';
import {useParams} from 'react-router-dom';
import {FilmsList} from './filmsList';
import './filmsWithGenre.css';

export const FilmsWithGenre = () => {
  const {name} = useParams();

  return (
    <div className={'genreAllFilms'}>
      <h3>{name}</h3>
      <FilmsList name={name} />
    </div>
  );
};

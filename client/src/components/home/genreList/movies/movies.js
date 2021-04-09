import React, {useEffect, useState} from 'react';
import {moviesService, useRatedFilms} from '../../../../services';
import {MoviesItem} from './moviesItem';
import './movies.css';
import {Loading} from '../../../loading';

export const Movies = ({name, setStyles}) => {
  const [films, setFilms] = useState([]);

  const {adjustRating, loading: ratedFilmsLoading} = useRatedFilms();

  const handleFilmsData = async () => {
    const response = await moviesService.getMoviesWithGenre(name);
    if (response.length === 0) {
      setStyles(false);
      return;
    }
    setFilms(response.slice(0, 4));
  };

  useEffect(() => {
    handleFilmsData();
  }, []);

  return ratedFilmsLoading ? (
    <Loading />
  ) : (
    <div className={'film-row'}>
      {adjustRating(films).map((value, index) => (
        <MoviesItem items={value} key={index} name={name} />
      ))}
    </div>
  );
};

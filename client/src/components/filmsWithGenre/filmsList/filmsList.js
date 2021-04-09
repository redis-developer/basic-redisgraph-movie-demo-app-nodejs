import React, {useEffect, useState} from 'react';
import {moviesService, useRatedFilms} from '../../../services';
import {MoviesItem} from '../../home/genreList/movies/moviesItem';
import {Loading} from '../../loading';

export const FilmsList = ({name}) => {
  const [loading, setLoading] = useState(true);
  const [films, setFilms] = useState([]);
  const {adjustRating, loading: ratedFilmsLoading} = useRatedFilms();

  const handleFilmsData = async () => {
    const response = await moviesService.getMoviesWithGenre(name);
    setFilms(response);
    setLoading(false);
  };

  useEffect(() => {
    handleFilmsData();
  }, []);

  return (
    <div className={'film-row'}>
      {loading || ratedFilmsLoading ? (
        <Loading />
      ) : (
        adjustRating(films).map((value, index) => (
          <MoviesItem items={value} key={index} name={name} />
        ))
      )}
    </div>
  );
};

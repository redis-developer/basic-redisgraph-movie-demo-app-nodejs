import React, {useEffect, useState} from 'react';
import {GenreItem} from './genreItem';
import {genresService} from '../../../services';
import {Loading} from '../../loading';

export const GenreList = () => {
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState([]);

  const handleGenresData = async () => {
    const response = await genresService.getAllGenres();

    setGenres(response);
    setLoading(false);
  };

  useEffect(() => {
    handleGenresData();
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        genres.map((value, index) => <GenreItem key={index} items={value} />)
      )}
    </div>
  );
};

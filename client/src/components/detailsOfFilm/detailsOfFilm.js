import React, {useEffect, useState} from 'react';
import {moviesService, useRatedFilms} from '../../services';
import './detailsOfFilm.css';
import {useLocation, useHistory} from 'react-router-dom';
import {DetailsItem} from './detailsItem';
import {Loading} from '../loading';

export const DetailsOfFilm = () => {
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [film, setFilm] = useState([]);

  const query = new URLSearchParams(useLocation().search);
  const id = query.get('id');

  const handleGetOneMovie = async () => {
    const response = await moviesService.getMovieById(id);
    setFilm(response);
    setLoading(false);
  };

  useEffect(() => {
    handleGetOneMovie();
  }, []);

  const {adjustRating} = useRatedFilms();

  const handleGetIdActors = (id) => {
    history.push(`/actors/${id}`);
  };

  const handleGetIdDirectors = (id) => {
    history.push(`/directions/${id}`);
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <DetailsItem
          film={adjustRating([film])[0]}
          handleGetIdActors={handleGetIdActors}
          handleGetIdDirectors={handleGetIdDirectors}
        />
      )}
    </div>
  );
};

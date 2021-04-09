import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router';
import {personService, useRatedFilms} from '../../../services';
import {PageItem} from '../pageItem';
import {Loading} from '../../loading';

export const ActorsPage = () => {
  const {id} = useParams();

  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleActorData = async () => {
    const response = await personService.getActorById(id);
    setActors(response);
    setLoading(false);
  };

  useEffect(() => {
    handleActorData();
  }, []);

  const {adjustRating, loading: ratedFilmsLoading} = useRatedFilms();

  return (
    <div>
      {loading || ratedFilmsLoading ? (
        <Loading />
      ) : (
        <PageItem info={actors.actor} films={adjustRating(actors.movies)} />
      )}
    </div>
  );
};

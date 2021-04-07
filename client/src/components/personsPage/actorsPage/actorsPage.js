import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router';
import {personService} from '../../../services';
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

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <PageItem info={actors.actor} films={actors.movies} />
      )}
    </div>
  );
};

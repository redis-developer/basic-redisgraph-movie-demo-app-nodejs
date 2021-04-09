import React, {useState} from 'react';
import './moviesItem.css';
import {useHistory, Link} from 'react-router-dom';
import {Modal} from '../../../../modal';
import defaultFilm from '../../../../../images/defaultFilm.png';

export const MoviesItem = ({items, name}) => {
  const history = useHistory();

  const [active, setActive] = useState(false);

  const handleDetailsOfFilm = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setActive(true);
    } else {
      history.push(`/movies/${name}?id=${items.id}`);
    }
  };

  return (
    <div className={'card-film'} onClick={handleDetailsOfFilm}>
      {items.my_rating ? <span>My rate: {items.my_rating} of 10</span> : null}
      <div className={'film-photo'}>
        {!items.poster ? (
          <img src={defaultFilm} alt="defaultIco" />
        ) : (
          <img src={items.poster} alt={items.title} />
        )}
        <div className={'filmInfo'}>
          <p>Rating: {items.imdbRating} of 10</p>
          <div className={'rating'}>
            <div
              className={'rating-item'}
              style={{width: `${items.imdbRating * 10}%`}}></div>
          </div>
          <p>{items.runtime} min</p>
          <p>
            {items.year}, {items.countries[0]}
          </p>
        </div>
      </div>
      <div className={'film-title'}>
        <h4>{items.title}</h4>
      </div>
      <div className={'modalWindow'}>
        {active ? (
          <Modal active={active} setActive={setActive}>
            <h4 style={{marginTop: 72}}>
              <Link to={'/authorization'}>Sign up</Link> to see the details of
              the movie
            </h4>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

import React from 'react';
import './pageItem.css';
import defaultPerson from '../../../images/defaultPerson.png';
import {MoviesItem} from '../../home/genreList/movies/moviesItem';

export const PageItem = ({info, films}) => {
  console.log(info);
  return (
    <div className={'personInfoPage'}>
      <div className={'personInfoWrapper'}>
        <div className={'personImage'}>
          {!info.properties.poster ? (
            <img src={defaultPerson} alt="defaultPerson" />
          ) : (
            <img src={info.properties.poster} alt={info.properties.name} />
          )}
        </div>
        <div className={'personInfoText'} style={{marginLeft: 20}}>
          <h4>{info.properties.name}</h4>
          <p>Born year: {info.properties.born[0]}</p>
          {info.properties.died ? (
            <p>Dead in: {info.properties.died[0]}</p>
          ) : null}
          {info.properties.bornIn ? (
            <p>Born in: {info.properties.bornIn}</p>
          ) : null}
          {info.properties.bio ? (
            <p>{info.properties.bio}</p>
          ) : (
            <p>No information about this person</p>
          )}
        </div>
      </div>
      <h3>Films of this person: </h3>
      <div className={'film-row-person'}>
        {films.map((value, index) => (
          <MoviesItem key={index} items={value} name={'genre'} />
        ))}
      </div>
    </div>
  );
};

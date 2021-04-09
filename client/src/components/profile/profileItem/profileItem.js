import React from 'react';
import './profileItem.css';
import {MoviesItem} from '../../home/genreList/movies/moviesItem';

export const ProfileItem = ({user, films, handleLogOut}) => {
  return (
    <div className={'profile'}>
      <div className={'profilePage'}>
        <div className={'profileImage'}>
          <img src={user.avatar.full_size} alt="avatar" />
        </div>
        <div className={'profileName'}>
          <h2>{user.username}: Profile</h2>
        </div>
        <div className={'logout'}>
          <button onClick={handleLogOut}>Log out</button>
        </div>
      </div>
      <h3>Rated by me:</h3>
      <div className={'film-row'}>
        {films.map((value, index) => (
          <MoviesItem key={index} items={value} name={'genre'} />
        ))}
      </div>
    </div>
  );
};

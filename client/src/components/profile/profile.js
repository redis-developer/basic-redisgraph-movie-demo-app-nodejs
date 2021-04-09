import React, {useEffect, useState} from 'react';
import {ProfileItem} from './profileItem';
import {useRatedFilms, userService} from '../../services';
import {Loading} from '../loading';

export const Profile = () => {
  const [user, setUser] = useState(null);
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);

  const {adjustRating, loading: ratedFilmsLoading} = useRatedFilms();

  const handleUserData = () => {
    const userLocal = localStorage.getItem('user');
    const userParse = JSON.parse(userLocal);
    setUser(userParse);
  };

  const handleUserFilms = async () => {
    const ratedFilms = await userService.ratedFilms();
    setFilms(ratedFilms);
    setLoading(false);
  };

  const handleLogOut = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  useEffect(() => {
    handleUserData();
    handleUserFilms();
  }, []);

  return (
    <div>
      {loading || ratedFilmsLoading ? (
        <Loading />
      ) : (
        <ProfileItem
          user={user}
          films={adjustRating(films)}
          handleLogOut={handleLogOut}
        />
      )}
    </div>
  );
};

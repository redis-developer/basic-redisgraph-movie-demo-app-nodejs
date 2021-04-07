import React, {useEffect, useState} from 'react';
import {ProfileItem} from './profileItem';
import {userService} from '../../services';
import {Loading} from '../loading';

export const Profile = () => {
  const [user, setUser] = useState(null);
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);

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
      {loading ? (
        <Loading />
      ) : (
        <ProfileItem user={user} films={films} handleLogOut={handleLogOut} />
      )}
    </div>
  );
};

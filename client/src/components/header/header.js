import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import './header.css';
import icoMovies from '../../images/icoMovies.png';
import RedisLogo from './RedisLogo';

export const Header = () => {
  const [state, setState] = useState(true);
  const [icoUser, setIcoUser] = useState(null);
  const [username, setUsername] = useState(null);

  const dateFromLocal = localStorage.getItem('token');
  const userFromLocal = localStorage.getItem('user');

  const history = useHistory();

  useEffect(() => {
    if (dateFromLocal) {
      setState(false);
      const user = JSON.parse(userFromLocal);
      setUsername(user.username);
      setIcoUser(user.avatar);
    }
  }, [dateFromLocal]);

  return (
    <div className={'headerSection'}>
      <div className={'logo'}>
        {/* <Link to={'/'} className="text-decoration-none"> */}
        <div
          onClick={() => history.push('/')}
          className="d-flex align-items-center ml-3 cursor-pointer">
          <div>
            <RedisLogo size={51} />
          </div>
          <Link
            to={'/'}
            style={{marginTop: -5, marginLeft: 16}}
            className="text-decoration-none d-block text-white font-size-20">
            Redis Movie App
          </Link>
        </div>
        {/* </Link> */}
      </div>
      <div className="d-flex" style={{flex: 1}}></div>
      <div className={'auth'}>
        {state ? (
          <h3 style={{marginRight: 20}}>
            <Link to={'/authorization'}>Sign up</Link>
          </h3>
        ) : (
          <div className="d-flex" style={{marginRight: 32}}>
            <Link to={'/profile'} className="d-block align-items-center">
              <img
                src={icoUser.full_size}
                style={{width: 48, height: 48, marginRight: 8}}
                alt="avatar"
              />
            </Link>
            <div className="d-flex align-items-center">
              <Link to={'/profile'} className="text-decoration-none text-white">
                {username}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

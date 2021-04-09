import React from 'react';
import {userService} from '../../../services';
import {useRatedFilms} from '../../../services/user.service';

export const SignIn = ({handleChangeState, error, setError}) => {
  const {revalidate} = useRatedFilms();

  const handleSignIn = async (e) => {
    console.log('from handle');
    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[1].value;
    const response = await userService.signIn({username, password});
    if (!response) {
      console.log('from handle1');
      setError('Error, wrong password or user name...');
    } else {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      revalidate();
      window.location.href = '/';
    }
  };

  return (
    <div className={'authFormSection'}>
      <h3 style={{marginBottom: 24}}>Sign in</h3>
      <div>
        <form action="" method="POST" onSubmit={handleSignIn}>
          <span>Enter your name</span>
          <div style={{padding: '0 20px'}}>
            <input
              type="text"
              name="username"
              required
              style={{paddingLeft: 10, background: '#222'}}
              placeholder="e.g., username"
            />
          </div>
          <span>Enter your password</span>
          <div style={{padding: '0 20px'}}>
            <input
              type="password"
              name="passwordUser"
              required
              style={{paddingLeft: 10, background: '#222'}}
              placeholder="e.g., ***********"
            />
          </div>
          <p>{error}</p>
          <div style={{padding: '0 14px'}}>
            <button type="submit">Sign in</button>
          </div>
        </form>
      </div>
      <button
        onClick={() => {
          setError(null);
          handleChangeState();
        }}
        id="toSignUp">
        Create your account
      </button>
    </div>
  );
};

import React, {useState} from 'react';
import {userService} from '../../../services';
import {useHistory} from 'react-router';

export const SignIn = ({handleChangeState, error, setError}) => {
  const history = useHistory();

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
      window.location.href = '/';
    }
  };

  return (
    <div className={'authFormSection'}>
      <h3>Sign in</h3>
      <div>
        <form action="" method="POST" onSubmit={handleSignIn}>
          <span>Enter your name</span>
          <input type="text" name="username" required />
          <span>Enter your password</span>
          <input type="password" name="passwordUser" required />
          <p>{error}</p>
          <button type="submit">Sign in</button>
        </form>
      </div>
      <button onClick={handleChangeState} id="toSignUp">
        Create your account
      </button>
    </div>
  );
};

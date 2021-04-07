import React from 'react';
import {userService} from '../../../services';

export const SignUp = ({
  handleChangeState,
  setButton,
  button,
  error,
  setError,
}) => {
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (e.target[1].value === e.target[2].value) {
      const username = e.target[0].value;
      const password = e.target[1].value;
      const response = await userService.signUp({username, password});
      if (!response) {
        setError('Wrong password or user name...');
      } else {
        setButton(!button);
      }
    } else {
      setError('Wrong password or user name...');
    }
  };

  return (
    <div className={'authFormSection'}>
      <h3>Create account</h3>
      <div>
        <form action="" method="POST" onSubmit={handleSignUp}>
          <span>Enter your name</span>
          <input type="text" name="username" required min={2} max={50} />
          <span>Enter your password</span>
          <input type="password" name="password" required />
          <span>Repeat your password</span>
          <input type="password" name="password" required />
          <p>{error}</p>
          <button type="submit">Create account</button>
        </form>
      </div>
      <button onClick={handleChangeState} id="toSignIn">
        Have an account?
      </button>
    </div>
  );
};

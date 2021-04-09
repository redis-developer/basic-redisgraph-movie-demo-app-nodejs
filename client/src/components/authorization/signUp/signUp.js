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
    setError(null);
    e.preventDefault();
    if (e.target[1].value === e.target[2].value) {
      const username = e.target[0].value;
      const password = e.target[1].value;
      const response = await userService.signUp({username, password});
      if (response.error) {
        console.log(response.error);
        if (response.error.username) {
          setError(response.error.username);
        } else {
          setError('Wrong password or user name...');
        }
      } else {
        setButton(!button);
      }
    } else {
      setError("Passwords don't match");
    }
  };

  return (
    <div className={'authFormSection'}>
      <h3 style={{marginBottom: 24}}>Create Account</h3>
      <div>
        <form action="" method="POST" onSubmit={handleSignUp}>
          <span>Enter your name</span>
          <div style={{padding: '0 20px'}}>
            <input
              type="text"
              name="username"
              required
              min={2}
              max={50}
              style={{paddingLeft: 10, background: '#222'}}
              placeholder="e.g., username"
            />
          </div>
          <span>Enter your password</span>
          <div style={{padding: '0 20px'}}>
            <input
              type="password"
              name="password"
              required
              style={{paddingLeft: 10, background: '#222'}}
              placeholder="e.g., ***********"
            />
          </div>
          <span>Repeat your password</span>
          <div style={{padding: '0 20px'}}>
            <input
              type="password"
              name="password"
              required
              style={{paddingLeft: 10, background: '#222'}}
              placeholder="e.g., ***********"
            />
          </div>
          <p>{error}</p>
          <div style={{padding: '0 14px'}}>
            <button type="submit">Create account</button>
          </div>
        </form>
      </div>
      <button
        onClick={() => {
          setError(null);
          handleChangeState();
        }}
        id="toSignIn">
        Have an account?
      </button>
    </div>
  );
};

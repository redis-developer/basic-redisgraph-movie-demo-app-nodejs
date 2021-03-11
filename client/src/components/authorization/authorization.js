import React, {useState} from 'react';
import {SignIn} from "./signIn";
import {SignUp} from "./signUp";
import './authorization.css';

export const Authorization = () => {

    const [button, setButton] = useState(false);
    const [error, setError] = useState('')

    const handleChangeState = () => {
        setButton(!button);
    }

    return (
        <div className={'authForm'}>
            <div className={'authFormWrapper'} style={button ? {height: '21rem'} : {height: '26rem'}}>
                {button ? <SignIn handleChangeState={handleChangeState} error={error} setError={setError}/> :
                    <SignUp handleChangeState={handleChangeState} setButton={setButton} button={button} error={error}
                            setError={setError}/>}
            </div>
        </div>
    )
};

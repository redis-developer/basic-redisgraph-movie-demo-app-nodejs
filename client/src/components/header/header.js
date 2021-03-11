import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import './header.css';
import icoMovies from '../../images/icoMovies.png';

export const Header = () =>{

    const [state, setState] = useState(true);
    const [icoUser, setIcoUser] = useState(null)

    const dateFromLocal = localStorage.getItem('token');
    const userFromLocal = localStorage.getItem('user');

    useEffect(()=>{
        if(dateFromLocal){
            setState(false);
            const { avatar } = JSON.parse(userFromLocal);
            setIcoUser(avatar)
        }
    }, [dateFromLocal])


    return(
        <div className={'headerSection'}>
            <div className={'logo'}>
                <Link to={'/'}><img src={icoMovies} alt="icoLogo"/></Link>
            </div>
            <div className={'headerTitle'}>
                <h1>Movies site</h1>
            </div>
            <div className={'auth'}>
                { state ? <h3><Link to={'/authorization'}>Authorization</Link></h3> : <Link to={'/profile'}><img src={icoUser.full_size}
                                                                                                                 alt="avatar"/></Link>}
            </div>
        </div>
    )
};

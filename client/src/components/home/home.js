import React from 'react';
import './home.css';
import {GenreList} from "./genreList";

export const Home = () =>{

    // const qwe = localStorage.getItem('token');
    // console.log(qwe);
    // const asd = JSON.parse(qwe);
    // console.log(asd);

    return(
        <div className={'homePage'}>
            <GenreList />
        </div>
    )
}

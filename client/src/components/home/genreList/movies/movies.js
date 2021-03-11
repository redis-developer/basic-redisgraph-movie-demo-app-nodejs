import React, {useEffect, useState} from 'react';
import {moviesService} from "../../../../services";
import {MoviesItem} from "./moviesItem";
import './movies.css';

export const Movies = ({name, setStyles}) => {

    const [films, setFilms] = useState([]);

    const handleFilmsData = async () =>{
        const response = await moviesService.getMoviesWithGenre(name);
        if(response.length === 0){
            setStyles(false)
            return
        }
        setFilms(response.slice(0,4));
    };

    useEffect(()=>{
        handleFilmsData();
    }, []);

    return (
        <div className={'film-row'}>
            {
                films.map((value, index) => <MoviesItem items={value} key={index} name={name}/>)
            }
        </div>
    )
}

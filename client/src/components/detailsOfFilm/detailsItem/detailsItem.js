import React, {useState} from 'react';
import './detailsItem.css';
import defaultPerson from '../../../images/defaultPerson.png';
import {Modal} from "../../modal";
import {RateFilm} from "../rateFilm";
import defaultFilm from '../../../images/defaultFilm.png';

export const DetailsItem = ({film, handleGetIdActors, handleGetIdDirectors}) => {

    const [active, setActive] = useState(false);

    return (
        <div className={'details'}>
            <div className={'details-page'}>
                <div className={'detailsImg'}>
                    {!film.poster ? <img src={defaultFilm} alt="defaultFilm"/> : <img src={film.poster} alt={film.title}/> }
                </div>
                <div className={'details-information'}>
                    <div>
                        <h2>{film.title}</h2>
                        <p>
                            Year: {film.year}.
                        </p>
                        <p>
                            Countries: {film.countries !== undefined && film.countries.map((value, index) => (index === film.countries.length -1 ? value + '.': value + ', '))}
                        </p>
                        <p>
                            Genres: {film.genres !== undefined && film.genres.map((value, index) => (index === film.genres.length -1 ? value.name + '.': value.name + ', '))}
                        </p>
                        <p>
                            Film duration: {film.runtime} min.
                        </p>
                        <p>
                            Actors: {film.actors !== undefined && film.actors.map((value,index) => index === film.actors.length -1 ? value.properties.name + '.': value.properties.name + ', ')}
                        </p>
                        <p>
                            {film.tagline}
                        </p>
                        <span>
                            Rating of film: {film.imdbRating} of 10
                        </span>
                        <div className={'ratingLine'}>
                            <div className={'ratingLineItem'} style={{width: `${film.imdbRating*10}%`}}>
                                .
                            </div>
                        </div>
                        <div className={'rateFilm'}>
                            <button onClick={()=> setActive(true)}>Rate film</button>
                            <Modal active={active} setActive={setActive}>
                                <RateFilm />
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
            <h3>Actors and founders:</h3>
            <div className={'details-film-actors'}>
                {
                    film.directors !== undefined && film.directors.map((value, index) => {
                        return (
                            <div className={'card-actor'} key={index}
                                 onClick={() => handleGetIdDirectors(value.tmdbId)}>
                                <div className={'photoActor'}>
                                    {!value.poster ? <img src={defaultPerson} alt="defaultPerson"/> :
                                        <img src={value.poster} alt={value.name}/>}
                                </div>
                                <div>
                                    <p>{value.name}</p>
                                </div>
                            </div>
                        )
                    })
                }
                {
                    film.actors !== undefined && film.actors.map((value, index) => {
                        return (
                            <div className={'card-actor'} key={index}
                                 onClick={() => handleGetIdActors(value.properties.tmdbId)}>
                                <div className={'photoActor'}>
                                    {!value.properties.poster ? <img src={defaultPerson} alt="defaultPerson"/> :
                                        <img src={value.properties.poster} alt={value.properties.name}/>
                                    }
                                </div>
                                <div className={'nameActor'}>
                                    <p>{value.properties.name}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
};

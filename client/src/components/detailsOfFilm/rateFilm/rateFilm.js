import React, {useState} from 'react';
import {useLocation} from "react-router-dom";
import {moviesService} from "../../../services";
import './rateFilm.css';
import {RateItem} from "./rateItem";

export const RateFilm = () => {

    const [success, setSuccess] = useState(false)
    const query = new URLSearchParams(useLocation().search);
    const id = query.get('id');

    const handleRate = async (value) => {
        const response = await moviesService.rateMovie(id, value);
        setSuccess(true);
        console.log(response);
    }

    const arrRating = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <div className={'ratePage'}>
            {
                success ? <h4>Thank you for rate!</h4> : <RateItem handleRate={handleRate} arr={arrRating}/>
            }
        </div>
    )
}

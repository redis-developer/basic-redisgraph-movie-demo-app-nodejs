import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {personService} from "../../../services";
import {PageItem} from "../pageItem";
import {Loading} from "../../loading";

export const DirectionsPage = () => {

    const {id} = useParams();

    const [direction, setDirection] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleDirectionData = async () => {
        const response = await personService.getDirectionById(id);
        setDirection(response);
        setLoading(false);
    };

    useEffect(()=>{
        handleDirectionData();
    }, []);

    return (
        <div>
            {loading ? <Loading /> :  <PageItem info={direction.director} films={direction.movies}/> }
        </div>
    )
}

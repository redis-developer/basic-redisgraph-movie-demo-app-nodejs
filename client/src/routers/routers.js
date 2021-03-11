import React from 'react';
import {Route, Switch} from "react-router-dom";
import {FilmsWithGenre, Home, DetailsOfFilm, Authorization, DirectionsPage, ActorsPage, Profile, Error} from "../components";

export const Routers = () => {
    return (
        <Switch>
            <Route path={'/'} exact component={Home}/>
            <Route path={'/movies/genre/:name'} exact component={FilmsWithGenre}/>
            <Route path={`/movies/:genre?:id`} exact component={DetailsOfFilm}/>
            <Route path={`/authorization`} component={Authorization}/>
            <Route path={`/actors/:id`} component={ActorsPage}/>
            <Route path={`/directions/:id`} component={DirectionsPage}/>
            <Route path={'/profile'} component={Profile} />
            <Route component={Error} />
        </Switch>
    )
};

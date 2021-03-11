import React from 'react';
import './error.css';

export const Error = () => {
    return (
        <div className={'errorPage'}>
            <div className={'errorWrapper'}>
                <h2>Error 404</h2>
                <p>Page not found</p>
            </div>
        </div>
    )
}

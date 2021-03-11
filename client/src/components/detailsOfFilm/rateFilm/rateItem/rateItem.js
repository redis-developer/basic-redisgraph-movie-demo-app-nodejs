import React from 'react';

export const RateItem = ({handleRate, arr}) => {
    return (
        <div>
            <h4>Rate this film!</h4>
            <ul>
                {
                    arr.map(value => <li onClick={() => handleRate(value)}>{value}</li>)
                }
            </ul>
            <span>Bad</span>
            <span>Good</span>
        </div>
    )
}

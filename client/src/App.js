import React, {createContext, useContext} from 'react';
import {BaseLayout} from './layout';
import {Routers} from './routers';
import {useRatedFilms2, RatedFilmsContext} from './services';

export const App = () => {
  const {
    adjustRating,
    revalidate,
    ratedFilmsLoading: loading,
  } = useRatedFilms2();
  return (
    <div>
      <RatedFilmsContext.Provider value={{adjustRating, revalidate, loading}}>
        <BaseLayout>
          <Routers />
        </BaseLayout>
      </RatedFilmsContext.Provider>
    </div>
  );
};

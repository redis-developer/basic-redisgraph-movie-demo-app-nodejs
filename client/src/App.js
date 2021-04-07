import React, {useEffect} from 'react';
import {BaseLayout} from './layout';
import {Routers} from './routers';

export const App = () => {
  return (
    <div>
      <BaseLayout>
        <Routers />
      </BaseLayout>
    </div>
  );
};

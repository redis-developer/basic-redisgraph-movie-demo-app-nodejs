import React from 'react';
import {Header} from '../components/header';
import {Footer} from '../components/footer';

export const BaseLayout = ({children}) => {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main style={{padding: '0 36px'}}>{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

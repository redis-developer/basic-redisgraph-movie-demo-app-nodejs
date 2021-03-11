import React from 'react';
import {Header} from "../components/header";
import {Footer} from "../components/footer";

export const BaseLayout = ({children}) => {
    return(
        <div>
            <header>
                <Header />
            </header>
            <main>
                {children}
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    )
};

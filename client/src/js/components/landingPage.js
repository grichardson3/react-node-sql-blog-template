import React from 'react';

import FirstPostSection from './firstPostSection';
import TagBrowser from './tagBrowser';
import SecondPostSection from './secondPostSection';

import Header from './header';
import Footer from './footer';

const LandingPage = () => (
    <div>
        <Header/>
        <div id="container" className="container">
            <FirstPostSection/>
            <TagBrowser/>
            <SecondPostSection/>
        </div>
        <Footer/>
    </div>
);

export default LandingPage;
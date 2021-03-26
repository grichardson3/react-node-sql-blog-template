import React from 'react';

import FirstPostSection from './firstPostSection';
import TagBrowser from './tagBrowser';
import SecondPostSection from './secondPostSection';

const LandingPage = () => (
    <div>
        <FirstPostSection/>
        <TagBrowser/>
        <SecondPostSection/>
    </div>
);

export default LandingPage;

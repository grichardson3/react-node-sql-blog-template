import React, { Component } from 'react';

import FirstPostSection from './firstPostSection';
import TagBrowser from './tagBrowser';
import SecondPostSection from './secondPostSection';

class LandingPage extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <FirstPostSection/>
                <TagBrowser/>
                <SecondPostSection/>
            </div>
        )
    }
}

export default LandingPage;

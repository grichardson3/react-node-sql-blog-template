import React, { Component } from 'react';
import '../css/app.css';

import Header from './components/header';
import ViewAllProfiles from './components/viewAllProfiles';

class App extends Component {
    render(){
        return (
            <div>
                <Header/>
                <ViewAllProfiles/>
            </div>
        )
    }
}

export default App;
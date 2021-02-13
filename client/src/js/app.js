import React, { Component } from 'react';
import '../css/app.css';

import Header from './components/header';
import Footer from './components/footer';
import FirstPostSection from './components/firstPostSection';
import TagBrowser from './components/tagBrowser';
import SecondPostSection from './components/secondPostSection';

class App extends Component {
    render(){
        return (
            <div>
                <Header/>
                <div id="container" className="container">
                    <FirstPostSection/>
                    <TagBrowser/>
                    <SecondPostSection/>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default App;
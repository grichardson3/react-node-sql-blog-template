import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import '../../css/app.scss';
import Header from '../components/header';
import Footer from '../components/footer';
import LandingPage from '../components/landingPage';
import SearchResults from '../components/searchResults';
import FilterByTag from '../components/filterByTag';
import IndividualPost from '../components/individualPost';
import FilterByAuthor from '../components/filterByAuthor';
import NotFoundPage from '../components/NotFoundPage';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            test: "test"
        }
    }
    render(){
        return (
            <BrowserRouter>
                <div>
                    <Header/>
                        <div id="container" className="container">
                            <Switch>
                                <Route path="/" component={LandingPage} exact />
                                <Route path="/search/:id" component={SearchResults}/>
                                <Route path="/tag/:id" component={FilterByTag}/>
                                <Route path="/post/:id" component={IndividualPost} />
                                <Route path="/author/:id" component={FilterByAuthor} />
                                <Route component={NotFoundPage} />
                            </Switch>
                        </div>
                    <Footer/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
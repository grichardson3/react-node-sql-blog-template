import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Style Imports
import './css/app.scss';

// Component Imports
import Header from './js/components/header';
import Footer from './js/components/footer';
import LandingPage from './js/components/landingPage';
import SearchResults from './js/components/searchResults';
import FilterByTag from './js/components/filterByTag';
import IndividualPost from './js/components/individualPost';
import FilterByAuthor from './js/components/filterByAuthor';
import NotFoundPage from './js/components/NotFoundPage';

// Main Application Component
const App = () => (
    <BrowserRouter>
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
    </BrowserRouter>
);

ReactDOM.render(<App/>, document.querySelector("main"));
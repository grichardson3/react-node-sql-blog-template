import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './js/store/configureStore';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { addPost } from './js/actions/posts';
/*import { addAuthor } from './js/actions/authors';
import getData from './js/selectors/data';*/

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

const store = configureStore();

// Main Application Component
class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            posts: []
        }
    }
    componentWillMount(){
        fetch('/posts')
        .then(response => response.json())
        .then((postsData) => {
            this.setState({ posts: postsData });
            this.state.posts.forEach((post) => {
                store.dispatch(addPost({
                    post_author: post.post_author,
                    post_content: post.post_content,
                    post_date: post.post_date,
                    post_featurephoto: post.post_featurephoto,
                    post_id: post.post_id,
                    post_tag: post.post_tag,
                    post_title: post.post_title,
                    post_views: post.post_views
                }));
            });
        });
    }
    render(){
        return (
            <Provider store={store}>
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
            </Provider>
        )
    }
}

ReactDOM.render(<App/>, document.querySelector("main"));
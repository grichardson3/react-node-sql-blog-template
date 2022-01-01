// Base Functional Imports
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './js/store/configureStore';

// Redux Store Dispatch Actions
import { addPost } from './js/actions/posts';
import { addAuthor } from './js/actions/authors';
import { addTheme } from './js/actions/theme';

// Style Imports
import './css/app.scss';

// Component Imports
import LandingPage from './js/components/landingPage';
import SearchResults from './js/components/searchResults';
import FilterByTag from './js/components/filterByTag';
import IndividualPost from './js/components/individualPost';
import FilterByAuthor from './js/components/filterByAuthor';
import NotFoundPage from './js/components/NotFoundPage';

// Admin Component Imports
import LoginPage from './js/components/admin/LoginPage';
import DashboardComponent from './js/components/admin/DashboardComponent';
import DashboardCreatePost from './js/components/admin/DashboardCreatePost';
import DashboardCreateProfile from './js/components/admin/DashboardCreateProfile';
import DashboardEditPost from './js/components/admin/DashboardEditPost';
import DashboardEditProfile from './js/components/admin/DashboardEditProfile';
import DashboardViewPosts from './js/components/admin/DashboardViewPosts';
import DashboardViewProfiles from './js/components/admin/DashboardViewProfiles';
import DashboardUpdatePassword from './js/components/admin/DashboardUpdatePassword';

// *** Polyfills for ES6 Functions & IE11 *** //

import smoothscroll from 'smoothscroll-polyfill';
import 'polyfill-array-includes';
import 'react-app-polyfill/ie9';

if (!String.prototype.includes) {
// eslint-disable-next-line
  String.prototype.includes = function(search, start) {

    if (search instanceof RegExp) {
      throw TypeError('first argument must not be a RegExp');
    }
    if (start === undefined) { start = 0; }
    return this.indexOf(search, start) !== -1;
  };
}

smoothscroll.polyfill();
require('es6-promise').polyfill();
require('isomorphic-fetch');
require("jspolyfill-array.prototype.findIndex");

// ****************************************** //

// Configuring the Redux Store
const store = configureStore();

// Main Application Component
class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            theme: [],
            posts: [],
            users: [],
        }
        // Count used to auto-increment client side IDs for posts
        this.count = 0;
    }
    componentDidMount(){
        fetch('/theme') // Currently not being used in project
        .then((response) => {

            // Checks HTTP status code

            if (response.status >= 500) {
                throw new Error("Server error.");
            } else if (response.status < 500 && response.status >= 400) {
                throw new Error("Page error.");
            } else if (response.status < 400) {
                return response.json();
            }
        })
        .then((themeData) => {
            this.setState({ 
                theme: themeData
            });
            store.dispatch(addTheme({
                theme_title: this.state.theme[0].theme_title,
                theme_fontHeading: this.state.theme[0].theme_fontHeading,
                theme_fontParagraph: this.state.theme[0].theme_fontParagraph,
                theme_fontDetails: this.state.theme[0].theme_fontDetails,
                theme_colorBody: this.state.theme[0].theme_colorBody,
                theme_colorContainer: this.state.theme[0].theme_colorContainer,
                theme_colorNavigation: this.state.theme[0].theme_colorNavigation,
                theme_darkMode: this.state.theme[0].theme_darkMode,
                theme_imageSlider: this.state.theme[0].theme_imageSlider,
                theme_colorGraph: this.state.theme[0].theme_colorGraph
            }));
        });
        fetch('/posts')
        .then((response) => {

            // Checks HTTP status code

            if (response.status >= 500) {
                throw new Error("Server error.");
            } else if (response.status < 500 && response.status >= 400) {
                throw new Error("Page error.");
            } else if (response.status < 400) {
                return response.json();
            }
        })
        .then((postsData) => {
            this.setState({ 
                posts: postsData
            });
            this.state.posts.forEach((post) => {
                this.count++;
                store.dispatch(addPost({
                    post_author: post.post_author,
                    post_content: post.post_content,
                    post_date: post.post_date,
                    post_featurephoto: post.post_featurephoto,
                    post_id: this.count,
                    post_dbid: post.post_id,
                    post_tag: post.post_tag,
                    post_title: post.post_title,
                    post_views: post.post_views
                }));
            });
        });
        fetch('/users')
        .then((response) => {

            // Checks HTTP status code

            if (response.status >= 500) {
                throw new Error("Server error.");
            } else if (response.status < 500 && response.status >= 400) {
                throw new Error("Page error.");
            } else if (response.status < 400) {
                return response.json();
            }
        })
        .then((usersData) => {
            this.setState({
                users: usersData
            });
            this.state.users.forEach((user) => {
                store.dispatch(addAuthor({
                    users_id: user.users_id,
                    users_profilepic: user.users_profilepic,
                    users_email: user.users_email,
                    users_username: user.users_username,
                    users_firstname: user.users_firstname,
                    users_lastname: user.users_lastname,
                    users_bio: user.users_bio,
                    users_facebook: user.users_facebook,
                    users_twitter: user.users_twitter,
                    users_linkedin: user.users_linkedin,
                    users_postamount: user.users_postamount,
                    users_sessionKey: user.users_sessionKey
                }));
            });
        });
    }
    render(){
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" component={LandingPage} exact />
                        <Route path="/search/:id" component={SearchResults}/>
                        <Route path="/tag/:id" component={FilterByTag}/>
                        <Route path="/post/:id" component={IndividualPost} />
                        <Route path="/author/:id" component={FilterByAuthor} />
                        
                        <Route path="/login" component={LoginPage} exact />
                        <Route path="/dashboard" component={DashboardComponent} exact />
                        <Route path="/createPost" component={DashboardCreatePost} exact />
                        <Route path="/createProfile" component={DashboardCreateProfile} exact />
                        <Route path="/editPost/:id" component={DashboardEditPost} exact />
                        <Route path="/editProfile/:id" component={DashboardEditProfile} exact />
                        <Route path="/viewPosts" component={DashboardViewPosts} exact />
                        <Route path="/viewProfiles" component={DashboardViewProfiles} exact />
                        <Route path="/updatePassword/:id" component={DashboardUpdatePassword} exact />
                        
                        <Route component={NotFoundPage} />
                    </Switch>
                </BrowserRouter>
            </Provider>
        )
    }
}

ReactDOM.render(<App/>, document.querySelector("main"));
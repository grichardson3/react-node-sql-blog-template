import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import DashboardNavigation from './DashboardNavigation';

const momentTZ = require('moment-timezone');

class DashboardComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            authenticated: false,
            loading: true, // This state determines what gets rendered in the render method
            posts: [],
            postViews: [],
            postAmount: 0, // This state is necessary to calculate widths for the graph
            highestNumber: 0, // This state is necessary to calculate widths for the graph
            count: 0
        }
    }
    componentDidMount(){

        // fetches authentication token from server 

        fetch(`/singleUser/${sessionStorage.getItem("usernameOrEmail")}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
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
        .then((userData) => {
            if (sessionStorage.getItem("sessionKey")) {
                // Authenticates current user session key with server
                if (sessionStorage.getItem("sessionKey") !== userData[0].users_sessionKey) {
                    this.props.history.push('/');
                } else {
                    this.setState({
                        authenticated: true
                    });
                    fetch('/totalPostAmount')
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
                    .then((data) => {
                        this.setState({
                            postAmount: data[0].theme_postAmount
                        });
                        const promise = new Promise((resolve, reject) => {
                            // Retries the promise if the information isn't loaded in fast enough
                            const retryPromise = () => {
                                setTimeout(() => {
                                    if (this.props.posts.length > 0) {
                                        resolve('Success');
                                    } else if (this.props.posts.length === 0) {
                                        retryPromise();
                                    } else {
                                        reject('Failed.');
                                    }
                                }, 25);
                            }
                            if (this.props.posts.length > 0) {
                                resolve('Success');
                            } else if (this.props.posts.length === 0) {
                                retryPromise();
                            } else {
                                reject('Failed.');
                            }
                        });
                        promise.then(() => {

                            // Sets state for all posts
                            this.setState({ 
                                posts: this.props.posts.sort((a, b) => b.post_views - a.post_views)
                            });

                        }).then(() => {

                            // Sets highest post view count in order to create widths for other graph bars
                            this.setState({
                                highestNumber: this.state.posts[0].post_views
                            });

                        }).then(() => {

                            // Sets state for each post's post view amounts
                            const postViews = document.querySelectorAll(".dashboardContainer__postViews")
                            postViews.forEach((row) => {
                                this.setState({
                                    postViews: this.state.postViews.concat(row.textContent)
                                });
                            });

                        }).then(() => {

                            // This calculates the width of each line in the graph, then increments post count state
                            const graphBar = document.querySelectorAll(".dashboardContainer__graphBar");
                            graphBar.forEach((bar) => {
                                bar.style.width = `${(this.state.postViews[this.state.count] / this.state.highestNumber) * 100}%`;
                                this.setState({
                                    count: this.state.count + 1
                                });
                            });

                        });
                    });
                }
            } else {
                this.props.history.push('/');
            }
        });

        const loginContainer = document.querySelector("#dashboard");
        const dataContainer = document.querySelector("#dashboardContainer__stats");

        loginContainer.style.height = (window.innerHeight) + "px";
        dataContainer.style.height = (window.innerHeight - 198) + "px";

        window.addEventListener("resize", () => {
            loginContainer.style.height = (window.innerHeight) + "px";
            dataContainer.style.height = (window.innerHeight - 198) + "px";
        });

        const searchInput = document.querySelector("#searchInput");

        searchInput.addEventListener("input", () => {

            // Sets loading state to true
            // Also clears state in order for loading prompt to show up in the render method
            this.setState({
                loading: true,
                posts: []
            });

            setTimeout(() => { // This setTimeout call is present to prevent application lag with graph bars re-rendering for every input
                this.setState({ 

                    // Sorts state posts by post views in descending order
                    posts: this.props.posts.sort((a, b) => b.post_views - a.post_views)

                });
                if (searchInput.value !== "") {

                    // Set state of posts based on the search input
                    this.setState({
                        posts: this.state.posts.filter((post) => post.post_title.toLowerCase().includes(searchInput.value.toLowerCase()))
                    });

                } else if (searchInput.value === "") {

                    // Resets state back to the default sort when the search input is empty
                    this.setState({
                        posts: this.props.posts.sort((a, b) => b.post_views - a.post_views)
                    });

                }

                // Post length checking prevents errors from occuring when no results get returned from the search query
                if (this.state.posts.length > 0) {
                    this.setState({ // Sets the highest number in the graph 
                        highestNumber: this.state.posts[0].post_views,
                        postViews: []
                    });
                    this.state.posts.forEach((post) => {

                        
                        this.setState(prevState => ({
                            postViews: prevState.postViews.concat(post.post_views)
                        }));

                    });

                    this.setState({
                        count: 0
                    });

                    const dataRow = document.querySelectorAll(".postRow");
                    dataRow.forEach(() => {
                        const graphBar = document.querySelectorAll(".dashboardContainer__graphBar")[this.state.count];
                        graphBar.style.width = `${(this.state.postViews[this.state.count] / this.state.highestNumber) * 100}%`;
                        this.setState({
                            count: this.state.count + 1
                        });
                    });

                    this.setState({
                        loading: false
                    });

                } else if (this.state.posts.length === 0) {
                    this.setState({
                        loading: false
                    });
                }
            }, 500);
        });
    }
    render(){
        return (
            <div id="dashboard">
                <DashboardNavigation history={this.props.history}/>
                <div id="dashboardContainer" className="fluid-container">
                    <div id="dashboardContainer__main">
                        <div className="dashboardContainer__dataHeader">
                            <h2>Stats</h2>
                            <div id="searchBar" className="input-group">
                                <input id="searchInput" className="form-control" placeholder="Search..."></input>
                            </div>
                        </div>
                        <div id="dashboardContainer__stats">
                            <table>
                                <tbody>
                                    <tr>
                                        <th>
                                            <span>Post Title</span>
                                        </th>
                                        <th>
                                            <span>Post Author</span>
                                        </th>
                                        <th>
                                            <span>Post Date</span>
                                        </th>
                                        <th>
                                            <span>Post Views</span>
                                        </th>
                                        <th id="dashboardContainer__graphColumn">
                                            <div>
                                                <span>Graph</span>
                                            </div>
                                        </th>
                                    </tr>
                                        {
                                            this.state.authenticated && this.state.posts.length !== 0 ?
                                            this.state.posts.map((post) => {
                                                return (
                                                    <tr className="postRow" key={post.post_id}>
                                                        <td>
                                                            <Link to={`/post/${post.post_dbid}`}>{post.post_title}</Link>
                                                        </td>
                                                        <td>
                                                            <Link to={`/author/${post.post_author}`}><span>{post.post_author}</span></Link>
                                                        </td>
                                                        <td>{momentTZ.unix(post.post_date).tz("America/Toronto").format('MMMM Do YYYY, h:mm:ss a')} (E.S.T)</td>
                                                        <td>
                                                            <span className="dashboardContainer__postViews">{post.post_views}</span>
                                                        </td>
                                                        <td>
                                                            <div className="dashboardContainer__graphBar"></div>
                                                        </td>
                                                    </tr>
                                                )
                                            }) : <tr id="stateStatus" >
                                                    {

                                                        this.state.loading ? 
                                                        <td className="row"><h4 className='dashboardStatusText'>Loading...</h4></td> : 
                                                        <td><h4 className='dashboardStatusText'>No results found.</h4></td>

                                                    }
                                                </tr>

                                            // Loading animations

                                            /*<tr className="row">
                                                <td className="col-xs-12 col-md-12 loadingBar"></td>
                                                <td className="col-xs-12 col-md-12 loadingBar"></td>
                                                <td className="col-xs-12 col-md-12 loadingBar"></td>
                                            </tr>*/

                                        }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts,
        users: state.users
    }
}

export default connect(mapStateToProps)(DashboardComponent);
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import DashboardNavigation from './DashboardNavigation';
import { removePost } from '../../actions/posts';

const momentTZ = require('moment-timezone');

class DashboardViewPosts extends Component {
    constructor(props){
        super(props);
        this.state = {
            authenticated: false,
            posts: [],
            postAmount: 0,
            title: { titleAscendingSort: null, titleIcon: "•" },
            author: { authorAscendingSort: null, authorIcon: "•" },
            date: { dateAscendingSort: true, dateIcon: "▼" },
            views: { viewsAscendingSort: null, viewsIcon: "•" }
        }
    }
    componentDidMount(){
        const loginContainer = document.querySelector("#dashboard");
        const dataContainer = document.querySelector("#dashboardContainer__stats");

        loginContainer.style.height = (window.innerHeight) + "px";
        dataContainer.style.height = (window.innerHeight - 238) + "px";

        window.addEventListener("resize", () => {
            loginContainer.style.height = (window.innerHeight) + "px";
            dataContainer.style.height = (window.innerHeight - 238) + "px";
        });

        const searchInput = document.querySelector("#searchInput");
        searchInput.addEventListener("input", () => {
            this.setState({
                posts: this.props.posts.sort((a, b) => b.post_date - a.post_date)
            })
            if (searchInput.value !== "") {
                this.setState(() => ({
                    posts: this.state.posts.filter((post) => post.post_title.toLowerCase().includes(searchInput.value.toLowerCase()))
                }));
            }
        });

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
            if (sessionStorage.getItem("sessionKey") !== userData[0].users_sessionKey) {
                this.props.history.push("/");
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
                    })
                    const promise = new Promise((resolve, reject) => {
                        // Retries the promise if the information isn't loaded in fast enough
                        const retryPromise = () => {
                            setTimeout(() => {
                                if (this.props.posts.length > 0) {
                                    resolve('Success');
                                } else if (this.props.posts.length === 0) {
                                    retryPromise();
                                } else {
                                    reject("Failed.");
                                }
                            }, 25);
                        }
                        if (this.props.posts.length > 0) {
                            resolve('Success');
                        } else if (this.props.posts.length === 0) {
                            retryPromise();
                        } else {
                            reject("Failed.");
                        }
                    });
                    promise.then(() => {
                        this.setState({
                            posts: this.props.posts.sort((a, b) => ('' + b.post_date).localeCompare(a.post_date))
                        });
                    });
                });
            }
        });
    }
    deletePost(value){
        this.props.dispatch(removePost({ post_id: value }));
        this.setState(() => ({
            posts: this.state.posts.filter((post) => value !== post.post_dbid)
        }));
        fetch(`/deletePost/${value}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'cors',
            body: JSON.stringify({ "postid": value })
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
        });
        fetch("/decrementUserPostAmount", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'cors',
            body: JSON.stringify(this.state.posts.filter((post) => value !== post.post_dbid))
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
        fetch("/decrementTotalPostAmount", {
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
    }
    toggleSortTitle(){
        if (this.state.title.titleAscendingSort) {
            this.setState({
                posts: this.state.posts.sort((a, b) => ('' + b.post_title).localeCompare(a.post_title)),
                title: { titleAscendingSort: false, titleIcon: "▼" },
                author: { authorAscendingSort: null, authorIcon: "•" },
                date: { dateAscendingSort: null, dateIcon: "•" },
                views: { viewsAscendingSort: null, viewsIcon: "•" }
            })
        } else if (!this.state.title.titleAscendingSort) {
            this.setState({
                posts: this.state.posts.sort((a, b) => ('' + a.post_title).localeCompare(b.post_title)),
                title: { titleAscendingSort: true, titleIcon: "▲" },
                author: { authorAscendingSort: null, authorIcon: "•" },
                date: { dateAscendingSort: null, dateIcon: "•" },
                views: { viewsAscendingSort: null, viewsIcon: "•" }
            })
        }
    }
    toggleSortAuthor(){
        if (this.state.author.authorAscendingSort) {
            this.setState({
                posts: this.state.posts.sort((a, b) => ('' + b.post_author).localeCompare(a.post_author)),
                title: { titleAscendingSort: null, titleIcon: "•" },
                author: { authorAscendingSort: false, authorIcon: "▼" },
                date: { dateAscendingSort: null, dateIcon: "•" },
                views: { viewsAscendingSort: null, viewsIcon: "•" }
            })
        } else if (!this.state.author.authorAscendingSort) {
            this.setState({
                posts: this.state.posts.sort((a, b) => ('' + a.post_author).localeCompare(b.post_author)),
                title: { titleAscendingSort: null, titleIcon: "•" },
                author: { authorAscendingSort: true, authorIcon: "▲" },
                date: { dateAscendingSort: null, dateIcon: "•" },
                views: { viewsAscendingSort: null, viewsIcon: "•" }
            })
        }
    }
    toggleSortDate(){
        if (this.state.date.dateAscendingSort) {
            this.setState({
                posts: this.state.posts.sort((a, b) => ('' + b.post_date).localeCompare(a.post_date)),
                title: { titleAscendingSort: null, titleIcon: "•" },
                author: { authorAscendingSort: null, authorIcon: "•" },
                date: { dateAscendingSort: false, dateIcon: "▼" },
                views: { viewsAscendingSort: null, viewsIcon: "•" }
            })
        } else if (!this.state.date.dateAscendingSort) {
            this.setState({
                posts: this.state.posts.sort((a, b) => ('' + a.post_date).localeCompare(b.post_date)),
                title: { titleAscendingSort: null, titleIcon: "•" },
                author: { authorAscendingSort: null, authorIcon: "•" },
                date: { dateAscendingSort: true, dateIcon: "▲" },
                views: { viewsAscendingSort: null, viewsIcon: "•" }
            })
        }
    }
    render(){
        return (
            <div id="dashboard">
                <DashboardNavigation history={this.props.history}/>
                <div id="dashboardContainer" className="container-fluid">
                    <div id="dashboardContainer__main">
                        <div id="dashboardContainer__header">
                            <div className="dashboardContainer__dataHeader">
                                <h2>Posts</h2>
                                <div id="searchBar" className="input-group">
                                    <input id="searchInput" className="form-control" placeholder="Search..."></input>
                                </div>
                            </div>
                            <Link to="/createPost">
                                <button id="addPostButton" className="btn btn-lg btn-success">Add Post</button>
                            </Link>
                        </div>
                        <div id="dashboardContainer__sort">
                            <div><span><b>Sort By:</b></span></div>
                            <div>
                                <span>Post Title</span>
                                <button onClick={() => this.toggleSortTitle()}>{this.state.title.titleIcon}</button>
                            </div>
                            <div>
                                <span>Post Author</span>
                                <button onClick={() => this.toggleSortAuthor()}>{this.state.author.authorIcon}</button>
                            </div>
                            <div>
                                <span>Post Date</span>
                                <button onClick={() => this.toggleSortDate()}>{this.state.date.dateIcon}</button>
                            </div>
                        </div>
                        <div id="dashboardContainer__stats">
                            <table>
                                <tbody>
                                    {
                                        this.state.authenticated && this.state.posts.length !== 0 ?
                                        this.state.posts.map((post) => {
                                            return (
                                                 <tr className="post" key={post.post_id}>
                                                    <td>
                                                        <Link to={`/post/${post.post_dbid}`}><span>{post.post_title}</span></Link>
                                                    </td>
                                                    <td>
                                                        <Link to={`/author/${post.post_author}`}><span>{post.post_author}</span></Link>
                                                    </td>
                                                    <td>{momentTZ.unix(post.post_date).tz("America/Toronto").format('MMMM Do YYYY, h:mm:ss a')} (E.S.T)</td>
                                                    <td className="crudButtons">
                                                        <Link to={`/editPost/${post.post_dbid}`}>
                                                            <button className="btn btn-sm btn-secondary">Edit Post</button>
                                                        </Link>
                                                        <button 
                                                            className="btn btn-sm btn-danger"
                                                            onClick={() => this.deletePost(post.post_dbid)}
                                                        >Delete Post</button>
                                                    </td>
                                                </tr>
                                            )
                                        }) : <tr>
                                                <td>
                                                    <h4 className='dashboardStatusText'>No results found.</h4>
                                                </td>
                                            </tr>
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

export default connect(mapStateToProps)(DashboardViewPosts);
import React, { Component } from 'react';
import ReactGA from 'react-ga';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import DashboardNavigation from './DashboardNavigation';

const momentTZ = require('moment-timezone');
ReactGA.initialize('G-RTLFZS92ZM');
ReactGA.pageview(window.location.pathname + window.location.search);

class DashboardComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            authenticated: false,
            posts: [],
            postViews: [],
            highestNumber: 0,
            count: 0
        }
    }
    componentDidMount(){
        fetch(`https://react-node-mysql-blog-template.herokuapp.com/singleUser/${sessionStorage.getItem("usernameOrEmail")}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
        .then(response => response.json())
        .then((userData) => {
            if (!sessionStorage.getItem("sessionKey")) {
                this.props.history.push('/');
            } else {
                setTimeout(() => {
                    this.setState({ 
                        authenticated: true,
                        posts: this.props.posts.sort((a, b) => b.post_views - a.post_views)
                    })
                    this.setState({
                        highestNumber: this.state.posts[0].post_views
                    })
                    document.querySelectorAll(".dashboardContainer__postViews").forEach((row) => {
                        this.setState({
                            postViews: this.state.postViews.concat(row.textContent)
                        })
                    });
                    document.querySelectorAll(".dashboardContainer__graphBar").forEach((bar) => {
                        bar.style.width = `${(this.state.postViews[this.state.count] / this.state.highestNumber) * 100}%`;
                        this.setState({
                            count: this.state.count + 1
                        })
                    });
                }, 500);
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
            setTimeout(() => {
                this.setState({ count: 0 })
                this.setState({
                    posts: this.props.posts.sort((a, b) => b.post_views - a.post_views)
                })
                this.setState({
                    highestNumber: this.state.posts[0].post_views
                })
                document.querySelectorAll(".dashboardContainer__postViews").forEach((row) => {
                    this.setState({
                        postViews: this.state.postViews.concat(row.textContent)
                    })
                });
                document.querySelectorAll(".dashboardContainer__graphBar").forEach((bar) => {
                    bar.style.width = `${(this.state.postViews[this.state.count] / this.state.highestNumber) * 100}%`;
                    this.setState({
                        count: this.state.count + 1
                    })
                });
            }, 1000);
            if (searchInput.value !== "") {
                setTimeout(() => {
                    this.setState(() => ({
                        posts: this.state.posts.filter((post) => post.post_title.toLowerCase().includes(searchInput.value.toLowerCase()))
                    }));
                }, 1000)
            }
        });
    }
    render(){
        console.log(this.state);
        return (
            <div id="dashboard">
                <DashboardNavigation/>
                <div id="dashboardContainer" className="fluid-container">
                    <div id="dashboardContainer__main">
                        <div className="dashboardContainer__dataHeader">
                            <h2>Stats</h2>
                            <div id="searchBar" className="input-group">
                                <input id="searchInput" className="form-control" placeholder="Search..."></input>
                                <div className="input-group-append">
                                    <button className="btn btn-primary" type="button" onClick={() => {
                                        this.props.history.push(`/search/${document.querySelector("#searchInput").value.toLowerCase()}`);
                                    }}>Search</button>
                                </div>
                            </div>
                        </div>
                        <div id="dashboardContainer__stats">
                            <table>
                                <tbody>
                                    <tr>
                                        <th>
                                            <div>
                                                <span>Post Title</span>
                                            </div>
                                        </th>
                                        <th>
                                            <div>
                                                <span>Post Author</span>
                                            </div>
                                        </th>
                                        <th>
                                            <div>
                                                <span>Post Date</span>
                                            </div>
                                        </th>
                                        <th>
                                            <div>
                                                <span>Post Views</span>
                                            </div>
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
                                                            <Link to={`/post/${post.post_id}`}><span>{post.post_title}</span></Link>
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
                                            }) : <tr><td className="noContent"><span>Loading...</span></td></tr>
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
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux';

import Header from './header';
import Footer from './footer';

// filter by author component

class FilterByAuthor extends Component {
    constructor(props){
        super(props);
        this.state = {
            posts: [],
            user: [],
            username: '',
            postAmount: 0
        }
    }
    componentDidMount(){
        fetch('/checkUser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Access-Control-Request-Headers': 'X-PINGOTHER, Content-Type',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
                'Access-Control-Request-Method': 'POST',
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'cors',
            body: JSON.stringify({ "user": window.location.href.split("/")[window.location.href.split("/").length - 1] })
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
        .then((data) => {
            this.setState({
                username: data[0].users_username,
                postAmount: data[0].users_postamount
            })
            const promise = new Promise((resolve, reject) => {
                // Retries the promise if the information isn't loaded in fast enough
                const retryPromise = () => {
                    setTimeout(() => {
                        if (this.props.users.length > 0) {
                            resolve('Success');
                        } else if (this.props.users.length === 0) {
                            retryPromise();
                        } else {
                            reject("Failed.");
                        }
                    }, 25);
                }
                if (this.props.users.length > 0) {
                    resolve('Success');
                } else if (this.props.users.length === 0) {
                    retryPromise();
                } else {
                    reject("Failed.");
                }
            });
            promise.then(() => {
                this.setState({
                    user: this.props.users.filter((user) => user.users_username.includes(data[0].users_username)),
                });
                this.setState({
                    posts: this.props.posts.filter((post) => post.post_author.includes(data[0].users_username))
                });
            });
        });
    }
    componentWillUpdate(){
        if ( this.props.users.length !== 0 ) {
            if (this.props.posts.length < this.state.postAmount) {
                setTimeout(() => {
                    this.setState({
                        user: this.props.users.filter((user) => user.users_username.includes(this.state.username)),
                    })
                    this.setState({
                        posts: this.props.posts.filter((post) => post.post_author.includes(this.state.username))
                    })
                }, 1)
            }
        }
    }
    render(){
        return (
            <div>
                <Header/>
                <div id="container" className="container">
                    {
                        this.state.user.length !== 0 ?
                        // eslint-disable-next-line
                        this.state.user.map((user) => {
                            return (
                                <div id="profileArea" key={user.users_username}>
                                    <div className="row">
                                        <div className="col-xs-12 col-sm-12 col-md-5 col-lg-4">
                                            <div id="profilePictureArea">
                                                <img src={user.users_profilepic} alt={user.users_username}/>
                                            </div>
                                        </div>
                                        <div className="col-xs-12 col-sm-12 col-md-7 col-lg-6">
                                            <div id="profileDetailsArea">
                                                <div>
                                                    <h1 id="profileUsername">{user.users_username}</h1>
                                                    <div id="profileMeta">
                                                        <span id="profileFullName">{user.users_firstname} {user.users_lastname}</span>
                                                    </div>
                                                    
                                                        {
                                                            user.users_bio ?
                                                            <span id="profileBio">
                                                                {user.users_bio}
                                                            </span> : 
                                                            <span id="profileBio">Nothing interesting to see here...</span>
                                                        }
                                                    
                                                    <div id="profileSocialMediaAccounts">
                                                        <ul>
                                                            {
                                                                user.users_facebook !== '' ? 
                                                                <li>
                                                                    <a 
                                                                        href={user.users_facebook}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                    >
                                                                        <img 
                                                                            src="../img/icon/facebook.png"
                                                                            alt=""
                                                                            title="Facebook"
                                                                        />
                                                                    </a>
                                                                </li> :
                                                                null
                                                            }
                                                            {
                                                                user.users_twitter !== '' ?
                                                                <li>
                                                                    <a 
                                                                        href={user.users_twitter}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                    >
                                                                        <img 
                                                                            src="../img/icon/twitter.png"
                                                                            alt=""
                                                                            title="Twitter"
                                                                        />
                                                                    </a>
                                                                </li> :
                                                                null
                                                            }
                                                            {
                                                                user.users_linkedin !== '' ?
                                                                <li>
                                                                    <a 
                                                                        href={user.users_linkedin}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                    >
                                                                        <img
                                                                            src="../img/icon/linkedin.png"
                                                                            alt=""
                                                                            title="LinkedIn"
                                                                        />
                                                                    </a>
                                                                </li> :
                                                                null
                                                            }
                                                        </ul>
                                                    </div>
                                                    <div id="profilePostsCount">
                                                        <span>Posts: {this.state.postAmount}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) : <div className="col col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <div className="noContent"><span>Loading...</span></div>
                                <br></br>
                            </div>
                    }
                    <div id="profilePostsArea">
                        <div className="row">
                            {
                                this.state.posts.length !== 0 ?
                                // this.state.posts.length !== 0 && this.state.userExists ?
                                // eslint-disable-next-line
                                this.state.posts.map((post) => {
                                    return (
                                        <div className="col-xs-12 blogPost" key={post.post_id}>
                                            <Link to={`/post/${post.post_dbid}`}><h2 className="blogPostTitle">{post.post_title}</h2></Link>
                                            <div className="blogPostMetaArea">
                                                <div>
                                                    <span>Author: </span>
                                                    <Link to={`/author/${post.post_author}`}><span className="blogPostAuthorLink">{post.post_author}</span></Link>
                                                </div>
                                                <span>Date Posted: {moment.unix(post.post_date).format("MMM Do, YYYY")}</span>
                                            </div>
                                            <p>
                                                {
                                                    post.post_content.length > 275 ? `${
                                                    post.post_content.substring(0,275)}...` :
                                                    post.post_content
                                                }
                                            </p>
                                            <div className="blogPostBottomMetaAreaTwo">
                                                <Link to={`/post/${post.post_dbid}`}><span className="blogPostReadMore">Read More</span></Link>
                                                <div>
                                                    <span className="blogPostTagText">Tags: </span>
                                                    <Link to={`/tag/${post.post_tag}`}><span className="blogPostIndividualTagText">{post.post_tag}</span></Link>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }) : null
                            }
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts,
        users: state.users
    };
};

export default connect(mapStateToProps)(FilterByAuthor);

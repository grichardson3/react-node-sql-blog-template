import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment'
import { connect } from 'react-redux';

import Header from './header';
import Footer from './footer';
import DefaultImageData from "./img/defImgData";

class IndividualPost extends Component {
    constructor(props){
        super(props);
        this.state = {
            posts: [],
            post: {}
        }
    }
    componentDidMount(){
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
        })
        promise.then(() => {
            this.setState({
                posts: this.props.posts
            });
            this.setState({
                post: this.state.posts.filter((post) => {
                    return (
                        post.post_dbid === JSON.parse(window.location.href.split("/")[window.location.href.split("/").length - 1])
                    );
                })[0]
            });
        });
    }
    /*componentWillUpdate(){
        if (
            this.props.posts[window.location.href.split("/")[window.location.href.split("/").length - 1] - 1] &&
            this.props.posts.length === this.props.posts[window.location.href.split("/")[window.location.href.split("/").length - 1] - 1].post_id
        ) {
            this.setState({
                post: this.props.posts[window.location.href.split("/")[window.location.href.split("/").length - 1] - 1]
            })
        }
    }*/
    addPostView(){
        let data = {
            postViews: this.props.posts[window.location.href.split("/")[window.location.href.split("/").length - 1] - 1]
        }
        if (data.postViews !== undefined) {
            fetch("/addPostView", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                mode: 'cors',
                body: JSON.stringify(data)
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
            .then(() => {
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
                        post: this.state.posts.filter((post) => {
                            return (
                                post.post_dbid === JSON.parse(window.location.href.split("/")[window.location.href.split("/").length - 1])
                            );
                        })[0]
                    });
                });
            });
        }
    }
    render(){
        return (
            <div>
                <Header/>
                <div id="container" className="container">
                    {
                        this.state.post ?
                        <div key={this.state.post.post_dbid}>
                            <div id="individualPostMetaArea">
                                <h2 id="individualPostTitle">{this.state.post.post_title}</h2>
                                <div id="individualPostBottomMeta">
                                    <div>
                                        <span id="individualPostAuthor">Author: </span>
                                        <Link to={`/author/${this.state.post.post_author}`}><span id="individualPostAuthorLink">{this.state.post.post_author}</span></Link>
                                    </div>
                                    <div id="individualPostDateViews">
                                    <span id="individualPostDate">Date Posted: {moment.unix(this.state.post.post_date).format("MMM Do, YYYY")}</span>
                                </div>
                                </div>
                                {
                                    this.state.post.post_featurephoto ?
                                    <div id="individualPostFeaturePhoto">
                                        <img
                                            title={this.state.post.post_title}
                                            alt={this.state.post.post_title}
                                            src={this.state.post.post_featurephoto}
                                        />
                                    </div> : <div>
                                        <img
                                            title={this.state.post.post_title}
                                            alt={this.state.post.post_title}
                                            src={this.state.post.post_featurephoto}
                                        />
                                    </div>
                                }
                                <article id="individualPostArticle">{this.state.post.post_content}</article>
                                <div id="individualPostTags">
                                    <span>Tags: </span>
                                    <Link to={`/tag/${this.state.post.post_tag}`}><span className="individualPostIndividualTag">{this.state.post.post_tag}</span></Link>
                                </div>
                            </div>
                        </div> : <div className="col col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <div className="noContent"><span>Loading...</span></div>
                                    <br></br>
                                </div>
                    }
                </div>
                <Footer/>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        posts: state.posts,
        users: state.users
    };
};

export default connect(mapStateToProps)(IndividualPost);

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux';

import Header from './header';
import Footer from './footer';

class FilterByTag extends Component {
    constructor(props){
        super(props);
        this.state = {
            posts: [],
            postAmount: 0
        }
    }
    componentDidMount(){
        fetch("/getTagPostAmount", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'cors',
            body: JSON.stringify({ "tag": window.location.href.split("/")[window.location.href.split("/").length - 1] })
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
                postAmount: JSON.parse(data[0])
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
                    posts: this.props.posts.filter((post) => post.post_tag.toLowerCase().includes(window.location.href.split("/")[window.location.href.split("/").length - 1]))
                });
            });
        });
    }
    componentWillUpdate(){
        if (this.props.posts.length !== 0) {
            if (this.props.posts.length < this.state.postAmount) {
                setTimeout(() => {
                    this.setState({
                        posts: this.props.posts.filter((post) => post.post_tag.toLowerCase().includes(window.location.href.split("/")[window.location.href.split("/").length - 1]))
                    });
                }, 1)
            }
        }
    }
    render(){
        let count = -1;
        return (
            <div>
                <Header/>
                <div id="container" className="container">
                    <div id="tagPostsResultString">
                        <h2>Filter by tag:
                            <span id="tagPostsIndividualTag">
                                {
                                    // eslint-disable-next-line
                                    this.state.posts.map((post) => {
                                        count++;
                                        return (
                                            count < 1 ? post.post_tag : null
                                        )
                                    })
                                }
                            </span>
                        </h2>
                    </div>
                    <div className="row">
                        {
                            this.state.posts.length !== 0 ?
                            // eslint-disable-next-line
                            this.state.posts.map((post) => {
                                return (
                                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 blogPost" key={post.post_id}>
                                        <Link to={`/post/${post.post_dbid}`}>
                                            <div className="blogPostFeaturePhoto">
                                                <img
                                                    title={post.post_title}
                                                    alt={post.post_title}
                                                    src={post.post_featurephoto}
                                                />
                                            </div>
                                        </Link>
                                        <Link to={`/post/${post.post_dbid}`}>
                                            <h2>
                                                <span className="blogPostTitle">{post.post_title}</span>
                                            </h2>
                                        </Link>
                                        <div className="blogPostMetaArea">
                                            <div>
                                                <span>Author: </span>
                                                <Link to={`/author/${post.post_author}`}>
                                                    <span className="blogPostAuthorLink">{post.post_author}</span>
                                                </Link>
                                            </div>
                                            <span className="blogPostDateText">
                                                Date Posted: {moment.unix(post.post_date).format("MMM Do, YYYY")}
                                            </span>
                                        </div>
                                        <p className="blogPostContent">
                                            {
                                                post.post_content.length > 200 ? 
                                                `${post.post_content.substring(0,200)}...` : 
                                                post.post_content
                                            }
                                        </p>
                                        <div className="blogPostBottomMetaArea">
                                            <Link to={`/post/${post.post_dbid}`}>
                                                <span className="blogPostReadMore">Read More</span>
                                            </Link>
                                            <div>
                                                <span className="blogPostTagText">Tags: </span>
                                                <Link to={`/tag/${post.post_tag}`}>
                                                    <span className="blogPostIndividualTagText">{post.post_tag}</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) : <div className="col col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <div className="noContent"><span>Loading...</span></div>
                                    <br></br>
                                </div>
                        }
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

export default connect(mapStateToProps)(FilterByTag);
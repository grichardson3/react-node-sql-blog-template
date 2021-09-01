import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux';

import Header from './header';
import Footer from './footer';

class SearchResults extends Component {
    constructor(props){
        super(props);
        this.state = {
            posts: []
        }
    }
    fetchData(){
        if (this.props.posts === []) {
            console.log("fetch");
            setTimeout(() => {
                this.fetchData();
            }, 200);
        } else if (this.props.posts !== []) { 
            this.setState({
                posts: this.props.posts.filter((post) => post.post_title.toLowerCase().includes(window.location.href.split("/")[window.location.href.split("/").length - 1]))
            });
        }
    }
    componentDidMount(){
        this.fetchData();
    }
    componentDidUpdate(){
        console.log("updated");
        /*if (this.state.isMounted) {
            setTimeout(() => {
                this.setState({
                    posts: this.props.posts.filter((post) => post.post_title.toLowerCase().includes(window.location.href.split("/")[window.location.href.split("/").length - 1]))
                })
            }, 500);
        }*/
    }
    render(){
        return (
            <div>
                <Header/>
                <div id="container" className="container">
                    <div id="tagPostsResultString">
                        <h2>Search results for: {window.location.href.split("/")[window.location.href.split("/").length - 1]}</h2>
                    </div>
                    <div className="row">
                        {
                            this.state.posts.length !== 0 ?
                            // eslint-disable-next-line
                            this.state.posts.map((post) => {
                                return (
                                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 blogPost" key={post.post_id}>
                                        <Link to={`/post/${post.post_id}`}>
                                            <div className="blogPostFeaturePhoto">
                                                <img
                                                    title={post.post_title}
                                                    alt={post.post_title}
                                                    src={post.post_featurephoto}
                                                />
                                            </div>
                                        </Link>
                                        <Link to={`/post/${post.post_id}`}>
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
                                            <Link to={`/post/${post.post_id}`}>
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
                                    <div className="noContent"><span>No results found...</span></div>
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

export default connect(mapStateToProps)(SearchResults);
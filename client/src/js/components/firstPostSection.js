import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

class FirstPostSection extends Component {
    constructor(props){
        super(props);
        this.state = {
            posts1: [],
            posts2: []
        }

        fetch('/allPosts1')
        .then(response => response.json())
        .then((postsInfo1) => {
            this.setState({ posts1: postsInfo1 })
        });
        fetch('/allPosts2')
        .then(response => response.json())
        .then((postsInfo2) => {
            this.setState({ posts2: postsInfo2 })
        });
    }
    render(){
        return (
            <div className="row">
                {
                    this.state.posts1.map((post) => {
                        return (
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 blogPost" key={post.post_id}>
                                <Link to="/post/1">
                                    <div className="blogPostFeaturePhoto">
                                        <img src={post.post_featurephoto}/>
                                    </div>
                                </Link>
                                <Link to="/post/1">
                                    <h2>
                                        <span className="blogPostTitle">
                                            {
                                                post.post_title.length > 75 ?
                                                `${post.post_title.substring(0,75)}...` :
                                                post.post_title
                                            }
                                        </span>
                                    </h2>
                                </Link>
                                <div className="blogPostMetaArea">
                                    <div>
                                        <span>Author: </span>
                                        <Link to={`/author/${post.post_author}`}>
                                            <span className="blogPostAuthorLink">{post.post_author}</span>
                                        </Link>
                                    </div>
                                    <span className="blogPostDateText">Date Posted: {moment.unix(post.post_date).format("MMM Do, YYYY")}</span>
                                </div>
                                <p className="blogPostContent">
                                    {
                                        post.post_content.length > 200 ?
                                        `${post.post_content.substring(0,200)}...` :
                                        post.post_content
                                    }
                                </p>
                                <div className="blogPostBottomMetaArea">
                                    <Link to={`/post/${post.post_id}`}><span className="blogPostReadMore">Read More</span></Link>
                                    <div>
                                        <span className="blogPostTagText">Tags: </span>
                                        <Link to={`/tag/${post.post_tag}`}>
                                            <span className="blogPostIndividualTagText">{post.post_tag}</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                {
                    this.state.posts2.map((post) => {
                        return (
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 blogPost" key={post.post_id}>
                                <Link to="/post/1">
                                    <div className="blogPostFeaturePhoto">
                                        <img src={post.post_featurephoto}/>
                                    </div>
                                </Link>
                                <Link to="/post/1">
                                    <h2>
                                        <span className="blogPostTitle">
                                            {
                                                post.post_title.length > 75 ?
                                                `${post.post_title.substring(0,75)}...` :
                                                post.post_title
                                            }
                                        </span>
                                    </h2>
                                </Link>
                                <div className="blogPostMetaArea">
                                    <div>
                                        <span>Author: </span>
                                        <Link to={`/author/${post.post_author}`}>
                                            <span className="blogPostAuthorLink">{post.post_author}</span>
                                        </Link>
                                    </div>
                                    <span className="blogPostDateText">Date Posted: {moment.unix(post.post_date).format("MMM Do, YYYY")}</span>
                                </div>
                                <p className="blogPostContent">
                                    {
                                        post.post_content.length > 200 ?
                                        `${post.post_content.substring(0,200)}...` :
                                        post.post_content
                                    }
                                </p>
                                <div className="blogPostBottomMetaArea">
                                    <Link to={`/post/${post.post_id}`}><span className="blogPostReadMore">Read More</span></Link>
                                    <div>
                                        <span className="blogPostTagText">Tags: </span>
                                        <Link to={`/tag/${post.post_tag}`}>
                                            <span className="blogPostIndividualTagText">{post.post_tag}</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
};

export default FirstPostSection;

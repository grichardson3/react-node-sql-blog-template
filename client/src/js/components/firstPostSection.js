import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux';

class FirstPostSection extends Component {
    constructor(props){
        super(props);
        this.state = {
            posts: []
        }
    }
    render(){
        return (
            <div>
                <div className="row">
                    {
                        
                        this.props.posts.length !== 0 ?
                        // eslint-disable-next-line
                        this.props.posts.map((post) => {
                            if (post.post_id && post.post_id <= (this.props.posts.findIndex((post) => post.post_id >= 2) + 1)) { // Filter if statement
                                return (
                                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 blogPost" id={`post${post.post_id}`} key={post.post_id}>
                                        <div>
                                            <Link to={`/post/${post.post_id}`}>
                                                <div className="blogPostFeaturePhoto">
                                                    <img 
                                                        alt=""
                                                        src={post.post_featurephoto}
                                                    />
                                                </div>
                                            </Link>
                                        </div>
                                        <div className={`blogPostTextArea postTextArea${post.post_id}`}>
                                            <Link to={`/post/${post.post_id}`}>
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
                                    </div>
                                )
                            }
                        }) : <div className="col col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <div className="noContent"><span>No posts</span></div>
                                <br></br><br></br>
                            </div>
                    }
                    {
                        // eslint-disable-next-line
                        this.props.posts.map((post) => {
                            if (post.post_id && 
                                post.post_id > (this.props.posts.findIndex((post) => post.post_id >= 2) + 1) && 
                                post.post_id <= (this.props.posts.findIndex((post) => post.post_id >= 8) + 1)) {
                                return (
                                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 blogPost" id={post.post_id} key={post.post_id}>
                                        <Link to={`/post/${post.post_id}`}>
                                            <div className="blogPostFeaturePhoto">
                                                <img 
                                                    alt=""
                                                    src={post.post_featurephoto}
                                                />
                                            </div>
                                        </Link>
                                        <Link to={`/post/${post.post_id}`}>
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
                            }
                        })
                    }
                </div>
            </div>
            
        );
    }
};

const mapStateToProps = (state) => {
    return {
        posts: state.posts,
        users: state.users,
        theme: state.theme
    };
};

export default connect(mapStateToProps)(FirstPostSection);

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux';

class SecondPostSection extends Component {
    constructor(props){
        super(props);
        this.state = {
            posts: [],
            postsForSectionThree: []
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
        });
        promise.then(() => {
            this.setState({
                posts: this.props.posts.sort((a, b) => ('' + b.post_date).localeCompare(a.post_date))
            });
            this.setState({
                postsForSectionThree: this.state.posts.filter((post) => post.post_id >= 9)
            });
        });
    }
    render(){
        return (
            <div>
                <div className="row">
                    {
                        // eslint-disable-next-line
                        this.state.postsForSectionThree.map((post) => {
                            return (
                                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 blogPost" id={post.post_id} key={post.post_id}>
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
                                        <h2 className="blogPostTitle">
                                            {
                                                post.post_title.length > 75 ?
                                                `${post.post_title.substring(0,75)}...` :
                                                post.post_title
                                            }
                                        </h2>
                                    </Link>
                                    <div className="blogPostMetaArea">
                                        <div>
                                            <span>Author: </span>
                                            <Link to={`/author/${post.post_author}`}>
                                                <span className="blogPostAuthorLink">
                                                    {post.post_author}
                                                </span>
                                            </Link>
                                        </div>
                                        <p 
                                        className="blogPostDateText"
                                        >Date Posted: {moment.unix(post.post_date).format("MMM Do, YYYY")}</p>
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
                            );
                        })
                    }
                </div>
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

export default connect(mapStateToProps)(SecondPostSection);

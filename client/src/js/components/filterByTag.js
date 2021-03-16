import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

class FilterByTag extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            tagPosts: []
        }
    }
    componentWillMount(){
        fetch('/postsFromTag')
        .then(response => response.json())
        .then((tagPostsData) => {
            this.setState({ tagPosts: tagPostsData })
        });
    }
    render(){
        console.clear();
        let count = -1;
        return (
            <div>
                <div id="tagPostsResultString">
                    <h2>Filter by tag:
                        <span id="tagPostsIndividualTag">
                            {
                                this.state.tagPosts.map((post) => {
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
                        this.state.tagPosts.map((post) => {
                            return (
                                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 blogPost" key={post.post_id}>
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
                        })
                    }
                </div>
            </div>
        )
    }
}

export default FilterByTag;
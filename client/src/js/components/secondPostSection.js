import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

class SecondPostSection extends Component {
    constructor(props){
        super(props);
        this.state = {
            posts3: []
        }
        fetch('/allPosts3')
        .then(response => response.json())
        .then((postsInfo3) => {
            this.setState({ posts3: postsInfo3 })
        });
    }
    render(){
        return (
            <div className="row">
                {
                    this.state.posts3.map((post) => {
                        return (
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 blogPost" key={post.post_id}>
                                <Link to="/post/1">
                                    <div className="blogPostFeaturePhoto">
                                        <img src={post.post_featurephoto}/>
                                    </div>
                                </Link>
                                <Link to="/post/1">
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
        )
    }
}

export default SecondPostSection;

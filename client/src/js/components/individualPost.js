import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment'

class IndividualPost extends Component {
    constructor(props){
        super(props);
        this.state = {
            singlePost: []
        }
    }
    componentDidMount(){
        fetch('/singlePost')
        .then(response => response.json())
        .then((singlePostData) => {
            this.setState({ singlePost: singlePostData })
        });
        // Create update request for post views
    }
    render(){
        return (
            <div>
                {
                    this.state.singlePost.map((post) => {
                        return (
                            <div>
                                <div id="individualPostMetaArea">
                                    <h2 id="individualPostTitle">{post.post_title}</h2>
                                    <div id="individualPostBottomMeta">
                                        <div>
                                            <span id="individualPostAuthor">Author: </span>
                                            <Link to="/author/1"><span id="individualPostAuthorLink">{post.post_author}</span></Link>
                                        </div>
                                        <div id="individualPostDateViews">
                                            <span id="individualPostDate">Date Posted: {moment.unix(post.post_date).format("MMM Do, YYYY")}</span>
                                        </div>
                                    </div>
                                    <div id="individualPostFeaturePhoto">
                                        <img src={post.post_featurephoto}></img>
                                    </div>
                                    <article id="individualPostArticle">{post.post_content}</article>
                                    <div id="individualPostTags">
                                        <span>Tags: </span>
                                        <Link to="/tag/1"><span className="individualPostIndividualTag">{post.post_tag}</span></Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
};

export default IndividualPost;

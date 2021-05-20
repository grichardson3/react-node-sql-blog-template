import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment'
import { connect } from 'react-redux';
import selectData from '../selectors/data';

class IndividualPost extends Component {
    constructor(props){
        super(props);
        this.state = {
            singlePost: []
        }
    }
    componentWillMount(){
        fetch('/singlePost')
        .then(response => response.json())
        .then((singlePostData) => {
            this.setState({ singlePost: singlePostData })
        });
    }
    render(){
        return (
            <div>
                {
                    this.props.data.map((post) => {
                        if (post.post_id && post.post_id === JSON.parse(window.location.href.split("/")[window.location.href.split("/").length - 1])) {
                            return (
                                <div key={post.post_id}>
                                    <div id="individualPostMetaArea">
                                        <h2 id="individualPostTitle">{post.post_title}</h2>
                                        <div id="individualPostBottomMeta">
                                            <div>
                                                <span id="individualPostAuthor">Author: </span>
                                                <Link to={`/author/${post.post_author}`}><span id="individualPostAuthorLink">{post.post_author}</span></Link>
                                            </div>
                                            <div id="individualPostDateViews">
                                                <span id="individualPostDate">Date Posted: {moment.unix(post.post_date).format("MMM Do, YYYY")}</span>
                                            </div>
                                        </div>
                                        <div id="individualPostFeaturePhoto">
                                            <img
                                                alt=""
                                                src={post.post_featurephoto}
                                            />
                                        </div>
                                        <article id="individualPostArticle">{post.post_content}</article>
                                        <div id="individualPostTags">
                                            <span>Tags: </span>
                                            <Link to={`/tag/${post.post_tag}`}><span className="individualPostIndividualTag">{post.post_tag}</span></Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })
                }
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        data: selectData(state.posts, state.authors)
    };
};

export default connect(mapStateToProps)(IndividualPost);

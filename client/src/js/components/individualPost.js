import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment'
import { connect } from 'react-redux';

import Header from './header';
import Footer from './footer';

class IndividualPost extends Component {
    constructor(props){
        super(props);
        this.state = {
            post: ''
        }
    }
    componentDidMount(){
        setTimeout(() => {
            this.setState({
                post: this.props.posts[window.location.href.split("/")[window.location.href.split("/").length - 1] - 1]
            })
            this.addPostView();
        }, 200)
    }
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
            }
    }
    render(){
        return (
            <div>
                <Header/>
                <div id="container" className="container">
                    {
                        this.state.post && this.state.post !== '' ?
                        <div key={this.state.post.post_id}>
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
                                <div id="individualPostFeaturePhoto">
                                    <img
                                        alt=""
                                        src={this.state.post.post_featurephoto}
                                    />
                                </div>
                                <article id="individualPostArticle">{this.state.post.post_content}</article>
                                <div id="individualPostTags">
                                    <span>Tags: </span>
                                    <Link to={`/tag/${this.state.post.post_tag}`}><span className="individualPostIndividualTag">{this.state.post.post_tag}</span></Link>
                                </div>
                            </div>
                        </div> : <div className="col col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <div className="noContent"><span>No results found...</span></div>
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

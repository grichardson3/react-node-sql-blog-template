import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class TagBrowser extends Component {
    constructor(props){
        super(props);
        this.state = {
            postTags: [],
            test: []
        }
        fetch('/tagsFromPosts')
        .then(response => response.json())
        .then((postTagsData) => {
            this.setState({ postTags: postTagsData })
        });
    }
    scrollHandler(e){
        const scrollEl = document.querySelector("#tagBrowserTagList");
        const eventId = e.target.id;
        if ( eventId === "tagBrowserLeftArrow" ) {
            scrollEl.scrollBy(-200, 0);
        } else if (eventId === "tagBrowserRightArrow") {
            scrollEl.scrollBy(200, 0);
        }
    }
    render(){
        return (
            <div id="tagBrowserArea">
                <h2>Browse By Tag</h2>
                <div id="tagBrowserScroller">
                    <button id="tagBrowserLeftArrow" onClick={this.scrollHandler}><span>&#60;</span></button>
                    <ul id="tagBrowserTagList">
                        {
                            this.state.postTags.length !== 0 ?
                            // eslint-disable-next-line
                            this.state.postTags.map((tag) => {
                                if (tag.post_tag) {
                                    return (
                                        <div key={tag.post_tag}>
                                            <Link to={`/tag/${tag.post_tag}`}>
                                                <li>
                                                    {tag.post_tag}
                                                </li>
                                            </Link>
                                        </div>
                                    )
                                }
                            }) : <div className="col col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <div className="noContent"><span>No tags</span></div>
                                    <br></br>
                                </div>
                        }
                    </ul>
                    <button id="tagBrowserRightArrow" onClick={this.scrollHandler}><span>&#62;</span></button>
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

export default connect(mapStateToProps)(TagBrowser);

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TagBrowser extends Component {
    constructor(props){
        super(props);
        this.state = {
            postTags: []
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
                    <button id="tagBrowserLeftArrow" onClick={this.scrollHandler.bind(this)}>&larr;</button>
                    <ul id="tagBrowserTagList">
                        {
                            this.state.postTags.map((tag) => {
                                return (
                                    <div key={tag.post_tag}>
                                        <Link to={`/tag/${tag.post_tag}`}>
                                            <li>
                                                {tag.post_tag}
                                            </li>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </ul>
                    <button id="tagBrowserRightArrow" onClick={this.scrollHandler.bind(this)}>&rarr;</button>
                </div>
            </div>
        )
    }
}

export default TagBrowser;

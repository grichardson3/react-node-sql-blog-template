import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TagBrowser extends Component {
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
                        <li><Link to="tag/1"><span>tag1</span></Link></li>
                    </ul>
                    <button id="tagBrowserRightArrow" onClick={this.scrollHandler.bind(this)}>&rarr;</button>
                </div>
            </div>
        )
    }
}

export default TagBrowser;

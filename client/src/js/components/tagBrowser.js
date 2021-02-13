import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import '../../css/components/tagBrowser.css';

class TagBrowser extends Component {
    constructor(props){
        super(props);
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
                        <li><span>tag1</span></li>
                        <li><span>tag2</span></li>
                        <li><span>tag3</span></li>
                        <li><span>tag1</span></li>
                        <li><span>tag2</span></li>
                        <li><span>tag3</span></li>
                        <li><span>tag1</span></li>
                        <li><span>tag2</span></li>
                        <li><span>tag3</span></li>
                        <li><span>tag1</span></li>
                        <li><span>tag2</span></li>
                        <li><span>tag3</span></li>
                    </ul>
                    <button id="tagBrowserRightArrow" onClick={this.scrollHandler.bind(this)}>&rarr;</button>
                </div>
            </div>
        )
    }
}

export default TagBrowser;

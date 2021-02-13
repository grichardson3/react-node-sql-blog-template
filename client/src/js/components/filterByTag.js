import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import FilterByAuthor from './filterByAuthor';
import IndividualPost from './individualPost';
import '../../css/components/postSection.css';
import '../../css/components/filterByTag.css';

class FilterByTag extends Component {
    constructor(props){
        super(props);
    }
    loadAuthorPosts(){
        ReactDOM.render(<FilterByAuthor/>, document.querySelector("#container"));
    }
    loadTagPosts(){
        ReactDOM.render(<FilterByTag/>, document.querySelector("#container"));
    }
    loadIndividualPost(){
        ReactDOM.render(<IndividualPost/>, document.querySelector("#container"));
    }
    render(){
        return (
            <div>
                <div id="tagPostsResultString">
                    <h2>Filter by tag: <span id="tagPostsIndividualTag">undefined</span></h2>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 blogPost">
                        <div className="blogPostFeaturePhoto" onClick={this.loadIndividualPost.bind(this)}></div>
                        <h2 className="blogPostTitle" onClick={this.loadIndividualPost.bind(this)}>Title</h2>
                        <div className="blogPostMetaArea">
                            <span>Author: <span className="blogPostAuthorLink" onClick={this.loadAuthorPosts.bind(this)}>Anonymous</span></span>
                            <span className="blogPostDateText">Date Posted: 12/31/1999</span>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.</p>
                        <div className="blogPostBottomMetaArea">
                            <span className="blogPostReadMore" onClick={this.loadIndividualPost.bind(this)}>Read More</span>
                            <span className="blogPostTagText">Tags: <span className="blogPostIndividualTagText" onClick={this.loadTagPosts.bind(this)}>undefined</span>, <span className="blogPostIndividualTagText" onClick={this.loadTagPosts.bind(this)}>tag1</span></span>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 blogPost">
                        <div className="blogPostFeaturePhoto" onClick={this.loadIndividualPost.bind(this)}></div>
                        <h2 className="blogPostTitle" onClick={this.loadIndividualPost.bind(this)}>Title</h2>
                        <div className="blogPostMetaArea">
                            <span>Author: <span className="blogPostAuthorLink" onClick={this.loadAuthorPosts.bind(this)}>Anonymous</span></span>
                            <span className="blogPostDateText">Date Posted: 12/31/1999</span>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.</p>
                        <div className="blogPostBottomMetaArea">
                            <span className="blogPostReadMore" onClick={this.loadIndividualPost.bind(this)}>Read More</span>
                            <span className="blogPostTagText">Tags: <span className="blogPostIndividualTagText" onClick={this.loadTagPosts.bind(this)}>undefined</span>, <span className="blogPostIndividualTagText" onClick={this.loadTagPosts.bind(this)}>tag1</span></span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FilterByTag;
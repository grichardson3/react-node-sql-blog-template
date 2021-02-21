import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SearchResults extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <div id="searchResultsHeaderArea">
                    <h2 id="searchResultsResultString">Search results for undefined...</h2>
                    <div id="searchResultsFilterArea">
                        <span>Filter By: </span>
                        <select className="form-control" id="searchResultsFilter">
                            <option>Most Recent</option>
                            <option>Post Title</option>
                            <option>Author Name</option>
                        </select>
                    </div>
                </div>
                <div id="searchResultsPostsArea">
                    <div className="row">
                        <div className="col-xs-12 blogPost">
                            <Link to="/post/1"><h2 className="blogPostTitle">Title</h2></Link>
                            <div className="blogPostMetaArea">
                                <div>
                                    <span>Author: </span>
                                    <span className="blogPostAuthorLink">Anonymous</span>
                                </div>
                                <span>Date Posted: 12/31/1999</span>
                            </div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.</p>
                            <div className="blogPostBottomMetaArea">
                                <span className="blogPostReadMore" /*onClick={this.loadIndividualPost.bind(this)}*/>Read More</span>
                                <div>
                                    <span className="blogPostTagText">Tags: </span>
                                    <span className="blogPostIndividualTagText" /*onClick={this.loadTagPosts.bind(this)}*/>undefined</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchResults;

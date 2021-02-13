import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import FilterByTag from './filterByTag';
import IndividualPost from './individualPost';
import '../../css/components/filterByAuthor.css';
import '../../css/components/postSection.css';

class FilterByAuthor extends Component {
    constructor(props){
        super(props);
    }
    loadAuthorPosts(){
        console.log("loaded");
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
                <div id="profileArea">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-5 col-lg-3">
                            <div id="profilePictureArea">
                                <img src="img/profile-pic.jpg" alt="Profile Picture"/>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-7 col-lg-6">
                            <div id="profileDetailsArea">
                                <div>
                                    <h1 id="profileUsername">Username</h1>
                                    <div id="profileMeta">
                                        <span id="profileFullName">Firstname Lastname</span>
                                        <span id="profilePostCount">Posts: <span id="profilePostCountAmount">N/A</span></span>
                                    </div>
                                    <span id="profileBio">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.</span>
                                    <div id="profileSocialMediaAccounts">
                                        <ul>
                                            <li><a href="https://www.facebook.com" target="_blank"><img src="img/icon/facebook.png" alt="Facebook" title="Facebook"/></a></li>
                                            <li><a href="https://www.twitter.com" target="_blank"><img src="img/icon/twitter.png" alt="Twitter" title="Twitter"/></a></li>
                                            <li><a href="https://www.linkedin.com" target="_blank"><img src="img/icon/linkedin.png" alt="LinkedIn" title="LinkedIn"/></a></li>
                                            <li><a href="https://www.reddit.com" target="_blank"><img src="img/icon/reddit.png" alt="Reddit" title="LinkedIn"/></a></li>
                                            <li><a href="https://www.github.com" target="_blank"><img src="img/icon/github.png" alt="GitHub" title="GitHub"/></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="profilePostsArea">
                    <div className="row">
                        <div className="col-xs-12 blogPost">
                            <h2 className="blogPostTitle" onClick={this.loadIndividualPost.bind(this)}>Title</h2>
                            <div className="blogPostMetaArea">
                                <span>Author: <span className="blogPostAuthorLink" onClick={this.loadAuthorPosts.bind(this)}>Anonymous</span></span>
                                <span>Date Posted: 12/31/1999</span>
                            </div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.</p>
                            <span className="blogPostReadMore" onClick={this.loadIndividualPost.bind(this)}>Read More</span>
                        </div>
                        <div className="col-xs-12 blogPost">
                            <h2 className="blogPostTitle" onClick={this.loadIndividualPost.bind(this)}>Title</h2>
                            <div className="blogPostMetaArea">
                                <span>Author: <span className="blogPostAuthorLink" onClick={this.loadAuthorPosts.bind(this)}>Anonymous</span></span>
                                <span>Date Posted: 12/31/1999</span>
                            </div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.</p>
                            <span className="blogPostReadMore" onClick={this.loadIndividualPost.bind(this)}>Read More</span>
                        </div>
                        <div className="col-xs-12 blogPost">
                            <h2 className="blogPostTitle" onClick={this.loadIndividualPost.bind(this)}>Title</h2>
                            <div className="blogPostMetaArea">
                                <span>Author: <span className="blogPostAuthorLink" onClick={this.loadAuthorPosts.bind(this)}>Anonymous</span></span>
                                <span>Date Posted: 12/31/1999</span>
                            </div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.</p>
                            <span className="blogPostReadMore" onClick={this.loadIndividualPost.bind(this)}>Read More</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FilterByAuthor;

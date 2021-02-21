import React from 'react';
import { Link } from 'react-router-dom';

const FilterByAuthor = () => (
    <div>
        <div id="profileArea">
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-5 col-lg-3">
                    <div id="profilePictureArea">
                        <img src="../img/profile-pic.jpg" alt="Profile Picture"/>
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
                                    <li><a href="https://www.facebook.com" target="_blank"><img src="../img/icon/facebook.png" alt="Facebook" title="Facebook"/></a></li>
                                    <li><a href="https://www.twitter.com" target="_blank"><img src="../img/icon/twitter.png" alt="Twitter" title="Twitter"/></a></li>
                                    <li><a href="https://www.linkedin.com" target="_blank"><img src="../img/icon/linkedin.png" alt="LinkedIn" title="LinkedIn"/></a></li>
                                    <li><a href="https://www.reddit.com" target="_blank"><img src="../img/icon/reddit.png" alt="Reddit" title="Reddit"/></a></li>
                                    <li><a href="https://www.github.com" target="_blank"><img src="../img/icon/github.png" alt="GitHub" title="GitHub"/></a></li>
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
                    <Link to="/post/1"><h2 className="blogPostTitle">Title</h2></Link>
                    <div className="blogPostMetaArea">
                        <div>
                            <span>Author: </span>
                            <Link to="/author/1"><span className="blogPostAuthorLink">Anonymous</span></Link>
                        </div>
                        <span>Date Posted: 12/31/1999</span>
                    </div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.</p>
                    <div className="blogPostBottomMetaArea">
                        <Link to="/post/1"><span className="blogPostReadMore">Read More</span></Link>
                        <div>
                            <span className="blogPostTagText">Tags: </span>
                            <Link to="/tag/1"><span className="blogPostIndividualTagText">undefined</span></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default FilterByAuthor;

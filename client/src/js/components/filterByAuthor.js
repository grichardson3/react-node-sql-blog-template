import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

class FilterByAuthor extends Component {
    constructor(props){
        super(props);
        this.state = {
            users: [],
            userPosts: []
        }
    }
    componentWillMount(){
        fetch('/userSingle')
        .then(response => response.json())
        .then((userInfo) => {
            this.setState({ users: userInfo })
        });
        fetch('/userPosts')
        .then(response => response.json())
        .then((userPostsInfo) => {
            this.setState({ userPosts: userPostsInfo })
        });
    }
    render(){
        console.clear();
        return (
            <div>
                {
                    this.state.users.map((user) => {
                        return (
                            <div id="profileArea" key={user.users_username}>
                                <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-5 col-lg-4">
                                        <div id="profilePictureArea">
                                            <img src={user.users_profilepic} alt=""/>
                                        </div>
                                    </div>
                                    <div className="col-xs-12 col-sm-12 col-md-7 col-lg-6">
                                        <div id="profileDetailsArea">
                                            <div>
                                                <h1 id="profileUsername">{user.users_username}</h1>
                                                <div id="profileMeta">
                                                    <span id="profileFullName">{user.users_firstname} {user.users_lastname}</span>
                                                </div>
                                                <span id="profileBio">
                                                    {user.users_bio}
                                                </span>
                                                <div id="profileSocialMediaAccounts">
                                                    <ul>
                                                        {
                                                            user.users_facebook !== null ? 
                                                            <li>
                                                                <a 
                                                                    href={user.users_facebook}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                >
                                                                    <img 
                                                                        src="../img/icon/facebook.png"
                                                                        alt=""
                                                                        title="Facebook"
                                                                    />
                                                                </a>
                                                            </li> :
                                                            null
                                                        }
                                                        {
                                                            user.users_twitter !== null ?
                                                            <li>
                                                                <a 
                                                                    href={user.users_twitter}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                >
                                                                    <img 
                                                                        src="../img/icon/twitter.png"
                                                                        alt=""
                                                                        title="Twitter"
                                                                    />
                                                                </a>
                                                            </li> :
                                                            null
                                                        }
                                                        {
                                                            user.users_linkedin !== null ?
                                                            <li>
                                                                <a 
                                                                    href={user.users_linkedin}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                >
                                                                    <img
                                                                        src="../img/icon/linkedin.png"
                                                                        alt=""
                                                                        title="LinkedIn"
                                                                    />
                                                                </a>
                                                            </li> :
                                                            null
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                <div id="profilePostsArea">
                    <div className="row">
                        {
                            this.state.userPosts.map((post) => {
                                return (
                                    <div className="col-xs-12 blogPost" key={post.post_id}>
                                        <Link to="/post/1"><h2 className="blogPostTitle">{post.post_title}</h2></Link>
                                        <div className="blogPostMetaArea">
                                            <div>
                                                <span>Author: </span>
                                                <Link to={`/author/${post.post_author}`}><span className="blogPostAuthorLink">{post.post_author}</span></Link>
                                            </div>
                                            <span>Date Posted: {moment.unix(post.post_date).format("MMM Do, YYYY")}</span>
                                        </div>
                                        <p>
                                            {
                                                post.post_content.length > 275 ? `${
                                                post.post_content.substring(0,275)}...` :
                                                post.post_content
                                            }
                                        </p>
                                        <div className="blogPostBottomMetaArea">
                                            <Link to={`/post/${post.post_id}`}><span className="blogPostReadMore">Read More</span></Link>
                                            <div>
                                                <span className="blogPostTagText">Tags: </span>
                                                <Link to={`/tag/${post.post_tag}`}><span className="blogPostIndividualTagText">{post.post_tag}</span></Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default FilterByAuthor;

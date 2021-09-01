import React, { Component } from 'react';
import ReactGA from 'react-ga';
import { connect } from 'react-redux';
import { editAuthor } from '../../actions/authors';
import { editPostUsername } from '../../actions/posts';

import DashboardNavigation from './DashboardNavigation';

ReactGA.initialize('G-RTLFZS92ZM');
ReactGA.pageview(window.location.pathname + window.location.search);

class DashboardEditProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            authenticated: false,
            userId: ""
        }
    }
    componentDidMount(){
        fetch(`https://react-node-mysql-blog-template.herokuapp.com/singleUser/${sessionStorage.getItem("usernameOrEmail")}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
        .then(response => response.json())
        .then((userData) => {
            if (!sessionStorage.getItem("sessionKey")) {
                this.props.history.push("/");
            } else if (sessionStorage.getItem("sessionKey") !== userData[0].users_sessionKey){
                this.props.history.push("/");
            } else {
                this.setState({ authenticated: true })
            }     
        });
    }
    render(){
        return (
            <div>
                <DashboardNavigation/>
                <div id="dashboardContainer" className="container">
                    <div id="dashboardContainer__main">
                        <h1>Edit Profile</h1>
                        {
                            this.state.authenticated &&
                            // eslint-disable-next-line
                            this.props.users.map((user) => {
                                // eslint-disable-next-line
                                if (user.users_username && user.users_username === window.location.href.split("/")[window.location.href.split("/").length - 1]) {
                                    localStorage.setItem("user_id", user.users_id);
                                    localStorage.setItem("user_username", user.users_username);
                                    return (
                                        <div className="editProfile" key={user.users_id}>
                                            <div className="row">
                                                <div className="col col-xs-12 col-md-4">
                                                    <label>First Name</label>
                                                    <input id="firstname" className="form-control" type="text" name="firstname" defaultValue={user.users_firstname} />
                                                </div>
                                                <div className="col col-xs-12 col-md-4">
                                                    <label>Last Name</label>
                                                    <input id="lastname" className="form-control" type="text" name="lastname" defaultValue={user.users_lastname} />
                                                </div>
                                                <div className="col col-xs-12 col-md-4">
                                                    <label>Username</label>
                                                    <input id="username" className="form-control" type="text" name="email" defaultValue={user.users_username} />
                                                </div>
                                                <div className="col col-xs-12 col-md-12">
                                                    <label>Bio</label>
                                                    <textarea id="bio" className="form-control" rows="10" type="text" name="bio" defaultValue={user.users_bio} />
                                                </div>
                                                <div className="col col-xs-12 col-md-4">
                                                    <label>Facebook Link</label>
                                                    <input id="facebook" className="form-control" type="text" name="facebook" defaultValue={user.users_facebook} />
                                                </div>
                                                <div className="col col-xs-12 col-md-4">
                                                    <label>Twitter Link</label>
                                                    <input id="twitter" className="form-control" type="text" name="twitter" defaultValue={user.users_twitter} />
                                                </div>
                                                <div className="col col-xs-12 col-md-4">
                                                    <label>LinkedIn Link</label>
                                                    <input id="linkedin" className="form-control" type="text" name="linkedin" defaultValue={user.users_linkedin} />
                                                </div>
                                                <div className="col col-xs-12 col-md-12">
                                                    <button
                                                        className="btn btn-secondary"
                                                        onClick={() => {
                                                            let data = {
                                                                users_id: localStorage.getItem("user_id"),
                                                                users_firstname: document.querySelector("#firstname").value,
                                                                users_lastname: document.querySelector("#lastname").value,
                                                                users_username: document.querySelector("#username").value,
                                                                users_bio: document.querySelector("#bio").value,
                                                                users_facebook: document.querySelector("#facebook").value,
                                                                users_twitter: document.querySelector("#twitter").value,
                                                                users_linkedin: document.querySelector("#linkedin").value,
                                                            }
                                                            let dataTwo = {
                                                                post_author: document.querySelector("#username").value
                                                            }
                                                            let compareUsername = {
                                                                originalUsername: localStorage.getItem("user_username"),
                                                                newUsername: data.users_username
                                                            }
                                                            if (dataTwo.post_author !== localStorage.getItem("user_username")) {
                                                                fetch("https://react-node-mysql-blog-template.herokuapp.com/updateUsernameOnPosts", {
                                                                    method: 'PUT',
                                                                    headers: {
                                                                        'Content-Type': 'application/json',
                                                                        'Access-Control-Allow-Origin': '*'
                                                                    },
                                                                    mode: 'cors',
                                                                    body: JSON.stringify(compareUsername)
                                                                })
                                                                .then((res) => {
                                                                    if (res.status === 200) {
                                                                        this.props.posts.forEach((post) => {
                                                                            if (dataTwo.users_username !== post.post_author) {
                                                                                this.props.dispatch(editPostUsername(post.post_id, dataTwo));
                                                                            }
                                                                        })
                                                                    }
                                                                });
                                                            }
                                                            fetch("https://react-node-mysql-blog-template.herokuapp.com/saveUser", {
                                                                method: 'PUT',
                                                                headers: {
                                                                    'Content-Type': 'application/json',
                                                                    'Access-Control-Allow-Origin': '*'
                                                                },
                                                                mode: 'cors',
                                                                body: JSON.stringify(data)
                                                            })
                                                            .then((res) => {
                                                                if (res.status === 200) {
                                                                    localStorage.removeItem("user_id");
                                                                    localStorage.removeItem("user_username");
                                                                    this.props.dispatch(editAuthor(user.users_id, data));
                                                                    this.props.history.push("/viewProfiles");
                                                                } else if (res.status >= 400) {
                                                                    const editStatus = document.createElement("span");
                                                                    editStatus.textContent = "An error has occured";
                                                                    document.querySelector(".editProfile").appendChild(editStatus);
                                                                }
                                                            });
                                                        }}
                                                    >Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts,
        users: state.users
    }
}

export default connect(mapStateToProps)(DashboardEditProfile);
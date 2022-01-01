import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { addAuthor } from '../../actions/authors';
import DashboardNavigation from './DashboardNavigation';
import createProfileValidation from './scripts/createProfileValidation';

const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

class DashboardCreateProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            authenticated: false
        }
    }
    componentDidMount(){

        // fetches authentication token from server 

        fetch(`/singleUser/${sessionStorage.getItem("usernameOrEmail")}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
        .then((response) => {

            // Checks HTTP status code

            if (response.status >= 500) {
                throw new Error("Server error.");
            } else if (response.status < 500 && response.status >= 400) {
                throw new Error("Page error.");
            } else if (response.status < 400) {
                return response.json();
            }
        })
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
                        <div id="dashboardContainer__createAndEditHeader">
                            <h1>Create Profile</h1>
                            <Link to={'/dashboard'}>
                                <button className='btn btn-danger'>Cancel</button>
                            </Link>
                        </div>
                        <span>Form fields with a <b>*</b> are required in order for your profile to be created</span>
                        <br></br><br></br>
                        <div className="statusMessages"></div>
                        <br></br>
                        {
                            this.state.authenticated &&
                            <div className="addProfile">
                                <div className="row">
                                    <div className="col col-xs-12 col-md-3">
                                        <label>First Name *</label>
                                        <input id="firstname" className="form-control" name="firstname"/>
                                    </div>
                                    <div className="col col-xs-12 col-md-3">
                                        <label>Last Name *</label>
                                        <input id="lastname" className="form-control" name="lastname"/>
                                    </div>
                                    <div className="col col-xs-12 col-md-3">
                                        <label>E-Mail *</label>
                                        <input id="email" className="form-control" name="email"/>
                                    </div>
                                    <div className="col col-xs-12 col-md-3">
                                        <label>Username *</label>
                                        <input id="username" className="form-control" name="username"/>
                                    </div>
                                    <div className="col col-xs-12 col-md-6">
                                        <label>Password *</label>
                                        <input id="password" className="form-control" type="password" name="password"/>
                                    </div>
                                    <div className="col col-xs-12 col-md-6">
                                        <label>Confirm Password *</label>
                                        <input id="confirmpassword" className="form-control" type="password" name="confirmpassword"/>
                                    </div>
                                    <div className="col col-xs-12 col-md-4">
                                        <label>Facebook Link</label>
                                        <input id="facebook" className="form-control" name="facebook"/>
                                    </div>
                                    <div className="col col-xs-12 col-md-4">
                                        <label>Twitter Link</label>
                                        <input id="twitter" className="form-control" name="twitter"/>
                                    </div>
                                    <div className="col col-xs-12 col-md-4">
                                        <label>LinkedIn Link</label>
                                        <input id="linkedin" className="form-control" name="linkedin"/>
                                    </div>
                                    <div className="col col-xs-12 col-md-12">
                                        <label>Profile Picture (Link)</label>
                                        <input id="profilepic" className="form-control" name="profilepic"/>
                                    </div>
                                    <div className="col col-xs-12 col-md-12">
                                        <label>Bio</label>
                                        <textarea id="bio" rows="10" className="form-control" name="bio"/>
                                    </div>
                                    <div className="col col-xs-12 col-md-12">
                                        <button
                                            className="btn btn-secondary"
                                            onClick={() => {
                                                let data = {
                                                    users_firstname: document.querySelector("#firstname").value,
                                                    users_lastname: document.querySelector("#lastname").value,
                                                    users_email: document.querySelector("#email").value,
                                                    users_username: document.querySelector("#username").value,
                                                    users_password: document.querySelector("#password").value,
                                                    users_confirmpassword: document.querySelector("#confirmpassword").value,
                                                    users_facebook: document.querySelector("#facebook").value,
                                                    users_twitter: document.querySelector("#twitter").value,
                                                    users_linkedin: document.querySelector("#linkedin").value,

                                                    // Data value for profile pictures currently only accepts 
                                                    // links that aren't blocked by CORS Policy.
                                                    users_profilepic: document.querySelector("#profilepic").value,

                                                    users_bio: document.querySelector("#bio").value,
                                                }
                                                const validationStatus = createProfileValidation(data, this.props);
                                                
                                                // Checks to see if there are no validation errors.
                                                if (validationStatus.length === 0) {
                                                    const hash = bcrypt.hashSync(data.users_password, salt);
                                                    data.users_password = hash;
                                                    fetch("/addUser", {
                                                        method: 'POST',
                                                        headers: {
                                                            'Content-Type': 'application/json',
                                                            'Access-Control-Allow-Origin': '*'
                                                        },
                                                        mode: 'cors',
                                                        body: JSON.stringify(data)
                                                    })
                                                    .then((response) => {

                                                        // Checks HTTP status code before creating user

                                                        if (response.status >= 200 && response.status < 400) {
                                                            this.props.dispatch(addAuthor(data));
                                                            this.props.history.push("/viewProfiles");
                                                        } else if (response.status >= 400 && response.status < 500) {
                                                            const editStatus = document.createElement("span");
                                                            editStatus.textContent = "A page error has occured";
                                                            document.querySelector(".addProfile").appendChild(editStatus);
                                                        } else if (response.status >= 500) {
                                                            const editStatus = document.createElement("span");
                                                            editStatus.textContent = "A server error has occured";
                                                            document.querySelector(".addProfile").appendChild(editStatus);
                                                        }
                                                    });
                                                    fetch("/incrementTotalUserAmount", {
                                                        method: 'GET',
                                                        headers: {
                                                            'Content-Type': 'application/json',
                                                            'Access-Control-Allow-Origin': '*'
                                                        }
                                                    })
                                                    .then((response) => {

                                                        // Checks HTTP status code

                                                        if (response.status >= 500) {
                                                            throw new Error("Server error.");
                                                        } else if (response.status < 500 && response.status >= 400) {
                                                            throw new Error("Page error.");
                                                        } else if (response.status < 400) {
                                                            return response.json();
                                                        }
                                                    })
                                                } else {
                                                    document.querySelector(".statusMessages").innerHTML = "";
                                                    validationStatus.forEach((status) => {
                                                        const statusElement = document.createElement("div");
                                                        const statusMsg = document.createElement("span");
                                                        statusMsg.textContent = status;
                                                        statusElement.appendChild(statusMsg);
                                                        document.querySelector(".statusMessages").appendChild(statusElement);
                                                    });
                                                }
                                            }}
                                        >Submit</button>
                                    </div>
                                </div>
                            </div>
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

export default connect(mapStateToProps)(DashboardCreateProfile);
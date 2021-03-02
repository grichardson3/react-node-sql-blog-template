import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import '../../css/components/viewProfile.css'

import EditProfile from './editProfile';

class ViewProfile extends Component {
    constructor(props){
        super(props);
        this.editProfile = this.editProfile.bind(this);
        this.state = {
            id: props.userDetails.id,
            firstname: props.userDetails.firstname,
            lastname: props.userDetails.lastname,
            email: props.userDetails.email,
            username: props.userDetails.username,
            bio: props.userDetails.bio
        }
    }
    editProfile(e){
        e.preventDefault();
        ReactDOM.render(<EditProfile userDetails={this.state} />, document.querySelector("#container"));
    }
    render(){
        return (
            <div>
                <h1 className="profileHeaderText">{this.props.userDetails.firstname} {this.props.userDetails.lastname}</h1>
                <div className="singleProfilePicArea">
                    <div className="profilePicBG">
                        <img
                            className="profilePic"
                            src={this.props.userDetails.profilepic}
                            alt={this.props.userDetails.firstname + " " + this.props.userDetails.lastname}
                        />
                    </div>
                </div>
                <div>
                    <p>First Name: {this.props.userDetails.firstname}</p>
                    <p>Last Name: {this.props.userDetails.lastname}</p>
                    <p>E-Mail: {this.props.userDetails.email}</p>
                    <p>Username: {this.props.userDetails.username}</p>
                    <p>Bio: {this.props.userDetails.bio ? this.props.userDetails.bio : "No bio available..."}</p>
                    <button className="btn btn-secondary" onClick={this.editProfile}>Edit Profile</button>
                </div>
            </div>
        )
    }
}

export default ViewProfile;
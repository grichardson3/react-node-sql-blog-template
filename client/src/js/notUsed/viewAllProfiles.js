import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import ViewProfile from './viewProfile';
import EditProfile from './editProfile';

class ViewAllProfiles extends Component {
    constructor(props){
        super(props);
        this.state = {
            users: []
        }
    }
    // fetches data after component is mounted
    componentWillMount(){
        fetch('/users')
        .then(res => res.json())
        .then(users => this.setState({users}));
    }
    deleteUser(user){
        fetch('/deleteUser', {
            method: 'DELETE',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({id: user.id})
        })
        ReactDOM.render(<ViewAllProfiles/>, document.querySelector("#container"));
    }
    editProfile(user){
        ReactDOM.render(<EditProfile userDetails={user}/>, document.querySelector("#container"));
    }
    viewProfile(user){
        ReactDOM.render(<ViewProfile userDetails={user}/>, document.querySelector("#container"));
    }
    render(){
        return (
            <div className="row">
                {
                    this.state.users.map((user) => {
                        return (
                            <div className="col-xs-12 col-md-6 col-xl-4" key={user.id}>
                                <div className="profileArea">
                                    <h3
                                        className="profileHeaderText"
                                        onClick={this.viewProfile.bind(this, user)}
                                    >{user.firstname} {user.lastname}</h3>
                                    <div className="profilePicArea">
                                        <div className="profilePicBG">
                                            <img
                                                onClick={this.viewProfile.bind(this, user)}
                                                className="profilePic"
                                                src={user.profilepic}
                                                alt={user.firstname + " " + user.lastname}
                                            />
                                        </div>
                                    </div>
                                    <div className="editDetailsArea">
                                        <div className="inline">
                                            <div className="detailDesc">
                                                <span><b>E-Mail:</b></span><br></br>
                                                <span className="emailText">
                                                    <a className="linkText" href={"mailto:" + user.email}>{user.email}</a>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="inline">
                                            <div className="detailDesc">
                                                <span>
                                                    <b>Username:</b>
                                                </span><br></br>
                                                <span className="usernameText">
                                                    <span className="linkText" onClick={this.viewProfile.bind(this, user)}>{user.username}</span>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="inline">
                                            <button
                                                className="btn btn-secondary"
                                                onClick={this.editProfile.bind(this, user)}
                                            >Edit Details</button>
                                            <button
                                                className="btn btn-danger"
                                                onClick={this.deleteUser.bind(this, user)}
                                            >Delete User</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

export default ViewAllProfiles;

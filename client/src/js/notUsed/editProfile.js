import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import ViewAllProfiles from './viewAllProfiles';

class EditProfile extends Component {
    saveProfile(e){
        e.preventDefault();
        const input = e.target.elements;
        const userId = this.props.userDetails.id;
        const inputList = {
            id: userId,
            firstname: input.firstname.value,
            lastname: input.lastname.value,
            email: input.email.value,
            username: input.username.value,
            bio: input.bio.value
        }
        fetch('/saveUser', {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(inputList)
        });
        ReactDOM.render(<ViewAllProfiles/>, document.querySelector("#container"));
        // .then(res => res.json())
        // .then(user => this.setState({user}));
    }
    render(){
        return (
            <div className="row">
                <form onSubmit={this.saveProfile.bind(this)}>
                    <label>First Name:</label>
                    <input className="form-control" name="firstname" defaultValue={this.props.userDetails.firstname}/>
                    <br></br>
                    <label>Last Name:</label>
                    <input className="form-control" name="lastname" defaultValue={this.props.userDetails.lastname}/>
                    <br></br>
                    <label>E-Mail:</label>
                    <input className="form-control" name="email" defaultValue={this.props.userDetails.email}/>
                    <br></br>
                    <label>Username:</label>
                    <input className="form-control" name="username" defaultValue={this.props.userDetails.username}/>
                    <br></br>
                    <label>Bio:</label>
                    <textarea className="form-control" name="bio" rows="10" defaultValue={this.props.userDetails.bio ? this.props.userDetails.bio : null}/>
                    <br></br>
                    <button className="btn btn-success">Save Profile</button>
                </form>
            </div>
        )
    }
}

export default EditProfile;

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import ViewAllProfiles from './viewAllProfiles';

class AddUser extends Component {
    constructor(props){
        super(props);
    }
    addUser(e){
        e.preventDefault();
        let newUser = {
            firstname: e.target.elements.firstname.value,
            lastname: e.target.elements.lastname.value,
            email: e.target.elements.email.value,
            username: e.target.elements.username.value,
            password: e.target.elements.password.value,
            profilepic: e.target.elements.profilepic.value,
            bio: e.target.elements.bio.value
        }
        fetch('/addUser', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(newUser)
        })
        .then(function(res) {
            if (res.status >= 400) {
                throw new Error("Bad response from server");
            }
            return res.json();
        })
        .catch(function(err) {
            console.log(err);
        });
        ReactDOM.render(<ViewAllProfiles/>, document.querySelector("#container"));
    }
    render(){
        return (
            <div>
                <form onSubmit={this.addUser}>
                    <label>First Name</label>
                    <input className="form-control" name="firstname"/>
                    <br></br>
                    <label>Last Name</label>
                    <input className="form-control" name="lastname"/>
                    <br></br>
                    <label>E-Mail</label>
                    <input className="form-control" name="email"/>
                    <br></br>
                    <label>Username</label>
                    <input className="form-control" name="username"/>
                    <br></br>
                    <label>Password</label>
                    <input className="form-control" type="password" name="password"/>
                    <br></br>
                    <label>Profile Picture (link)</label>
                    <input className="form-control" name="profilepic"/>
                    <br></br>
                    <label>Bio</label>
                    <textarea rows="10" className="form-control" name="bio"/>
                    <br></br>
                    <button  name="submit" type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default AddUser;

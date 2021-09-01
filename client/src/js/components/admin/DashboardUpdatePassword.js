import React, { Component } from 'react';
import ReactGA from 'react-ga';
import { connect } from 'react-redux';

import DashboardNavigation from './DashboardNavigation';
import updatePasswordValidation from './scripts/updatePasswordValidation';

const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

ReactGA.initialize('G-RTLFZS92ZM');
ReactGA.pageview(window.location.pathname + window.location.search);

class DashboardUpdatePassword extends Component {
    constructor(props){
        super(props);
        this.state = {
            authenticated: false
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
                        {
                            this.state.authenticated &&
                            // eslint-disable-next-line
                            this.props.users.map((user) => {
                                if (user.users_username && user.users_username === window.location.href.split("/")[window.location.href.split("/").length - 1]) {
                                    return (
                                        <div className="updatePassword" key={user.users_id}>
                                            <h1>Update Password</h1>
                                            <div className="row">
                                                <div className="col col-xs-12 col-md-6">
                                                    <label>Password</label>
                                                    <input id="password" className="form-control" type="password" name="password" />
                                                </div>
                                                <div className="col col-xs-12 col-md-6">
                                                    <label>Confirm Password</label>
                                                    <input id="confirmpassword" className="form-control" type="password" name="confirmpassword" />
                                                </div>
                                            </div>
                                            <br></br>
                                            <button 
                                                className="btn btn-secondary"
                                                type="submit"
                                                name="submit" 
                                                onClick={() => {
                                                if (document.querySelector("#password").value === document.querySelector("#confirmpassword").value) {
                                                    let data = {
                                                        id: user.users_id,
                                                        password: document.querySelector("#password").value,
                                                        confirmPassword: document.querySelector("#confirmpassword").value
                                                    }
                                                    if (updatePasswordValidation(data).length === 0) {
                                                        const hash = bcrypt.hashSync(data.password, salt);
                                                        data.password = hash;
                                                        fetch("https://react-node-mysql-blog-template.herokuapp.com/updatePassword", {
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
                                                                // this.props.dispatch(editAuthor(data));
                                                                this.props.history.push("/viewProfiles");
                                                            } else if (res.status >= 400) {
                                                                const editStatus = document.createElement("span");
                                                                editStatus.textContent = "An error has occured";
                                                                document.querySelector(".updatePassword").appendChild(editStatus);
                                                            }
                                                        });
                                                    }
                                                }
                                            }
                                            }>Submit</button>
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

export default connect(mapStateToProps)(DashboardUpdatePassword);
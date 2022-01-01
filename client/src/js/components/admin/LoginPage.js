import React, { Component } from 'react';
const bcrypt = require('bcryptjs');
const randomstring = require("randomstring");
const salt = bcrypt.genSaltSync(10);

class LoginPage extends Component {
    componentDidMount(){   
        const loginContainer = document.querySelector(".loginContainer");

        loginContainer.style.height = (window.innerHeight) + "px";

        window.addEventListener("resize", () => {
            loginContainer.style.height = (window.innerHeight) + "px";
        });
    }
    render(){
        // In the inputs for this JSX Component, a placeholder username and password value are given for CMS demo purposes
        return (
            <div className="loginContainer">
                <div className="loginContainer__form">
                    <h1>Login</h1>
                    <br></br>
                    <label>Username or E-Mail</label>
                    <input id="usernameoremail" className="form-control" type="text" name="usernameoremail" defaultValue="johnappleseed@gmail.com"/>
                    <br></br>
                    <label>Password</label>
                    <input id="password" className="form-control" type="password" name="password" defaultValue="Test1234!"/>
                    <br></br>
                    <button className="btn btn-lg btn-primary" onClick={() => {
                        fetch('/users', {
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
                            const usernameOrEmailValue = document.querySelector("#usernameoremail").value;
                            const passwordValue = document.querySelector("#password").value;
                    
                            if (usernameOrEmailValue === userData[0].users_username || usernameOrEmailValue === userData[0].users_email) {
                                bcrypt.compare(passwordValue, userData[0].users_password, (err, result) => {
                                    if (result) {
                                        const sessionKeyValue = randomstring.generate();
                                        var hash = bcrypt.hashSync(sessionKeyValue, salt);
                                        sessionStorage.setItem("sessionKey", hash);
                                        sessionStorage.setItem("usernameOrEmail", usernameOrEmailValue);
                                        let data = {
                                            "sessionKey": hash,
                                            "usernameOrEmail": usernameOrEmailValue
                                        }
                                        fetch('/setSessionKey', {
                                            method: 'POST',
                                            headers: {
                                                'Accept': 'application/json',
                                                'Access-Control-Request-Headers': 'X-PINGOTHER, Content-Type',
                                                'Content-Type': 'application/json',
                                                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
                                                'Access-Control-Request-Method': 'POST',
                                                'Access-Control-Allow-Origin': '*'
                                            },
                                            mode: 'cors',
                                            body: JSON.stringify(data)
                                        })
                                        .then((res) => {

                                            // Checks HTTP status code before logging in

                                            if (res.status >= 500) {
                                                throw new Error("Server error");
                                            } else if (res.status < 500 && res.status >= 400) {
                                                throw new Error("Page error.");
                                            } else if (res.status < 400) {
                                                localStorage.setItem("lastURL", this.props.history.location.pathname);
                                                this.props.history.push("/dashboard");
                                            }
                                            return res.json();
                                        })
                                    } else if (err) {
                                        throw err;
                                    }
                                });
                            }
                        });
                    }}>Submit</button>
                    <br></br>
                    <br></br>
                    <span>Login with the default credential values above!</span>
                </div>
            </div>
            
        );
    }
};

export default LoginPage;
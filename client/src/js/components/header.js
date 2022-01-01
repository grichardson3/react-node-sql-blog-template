import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {
    render(){
        return (
            <header>
                <div id="logoArea">
                    <Link to="/">
                        <img 
                        src="../img/mern-blog-logo-white.png"
                        alt="MERN Blog"
                        title="MERN Blog"/>
                    </Link>
                </div>
                <div id="headerRightSide">
                    <div id="searchBar" className="input-group">
                        <input id="searchInput" className="form-control" placeholder="Search..."></input>
                        <div className="input-group-append">
                            <button id="searchButton" className="btn btn-primary" type="button" onClick={() => {
                                this.props.history.push(`/search/${document.querySelector("#searchInput").value.toLowerCase()}`);
                            }}>Search</button>
                        </div>
                    </div>
                    
                    <button className="btn btn-secondary" onClick={() => {

                        // fetches authentication token from server
                        // This fetch call checks to see if you're logged in or not
                        // if you are, then clicking the button will redirect you to the admin deshboard
                        // if not, then it will redirect you to the login page

                        fetch(`/singleUser/${sessionStorage.getItem("usernameOrEmail")}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Access-Control-Allow-Origin': '*'
                            }
                        })
                        .then(response => response.json())
                        .then((userData) => {
                            if (sessionStorage.getItem("sessionKey")) {
                                if (sessionStorage.getItem("sessionKey") !== userData[0].users_sessionKey) {
                                    this.props.history.push('/');
                                } else {
                                    this.props.history.push('/dashboard');
                                }
                            } else {
                                this.props.history.push("/login");
                            }
                        });
                    }}>Login</button>

                </div>
            </header>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts,
        users: state.users
    }
}

export default connect(mapStateToProps)(withRouter(Header));
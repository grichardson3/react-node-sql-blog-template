import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga';
import { connect } from 'react-redux';

import DashboardNavigation from './DashboardNavigation';

// Redux Store Dispatch Actions
// REMOVE_AUTHOR
const removeAuthor = ({ users_id } = {}) => ({
    type: 'REMOVE_AUTHOR',
    users_id
});

ReactGA.initialize('G-RTLFZS92ZM');
ReactGA.pageview(window.location.pathname + window.location.search);

class DashboardViewProfiles extends Component {
    constructor(props){
        super(props);
        this.state = {
            authenticated: false,
            users: [],
            firstName: { firstNameAscendingSort: null, firstNameIcon: "•" },
            lastName: { lastNameAscendingSort: null, lastNameIcon: "•" },
            email: { emailAscendingSort: null, emailIcon: "•" },
            username: { usernameAscendingSort: true, usernameIcon: "▼" }
        }
    }
    componentDidMount(){
        const loginContainer = document.querySelector("#dashboard");
        const dataContainer = document.querySelector("#dashboardContainer__stats");

        loginContainer.style.height = (window.innerHeight) + "px";
        dataContainer.style.height = (window.innerHeight - 238) + "px";

        window.addEventListener("resize", () => {
            loginContainer.style.height = (window.innerHeight) + "px";
            dataContainer.style.height = (window.innerHeight - 238) + "px";
        });

        const searchInput = document.querySelector("#searchInput");
        searchInput.addEventListener("input", () => {
            this.setState({
                users: this.props.users.sort((a, b) => ('' + b.users_username).localeCompare(a.users_username))
            })
            if (searchInput.value !== "") {
                this.setState(() => ({
                    users: this.state.users.filter((user) => user.users_username.toLowerCase().includes(searchInput.value.toLowerCase()))
                }));
            }
        })
        fetch(`/singleUser/${sessionStorage.getItem("usernameOrEmail")}`, {
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
                setTimeout(() => {
                    this.setState({
                        authenticated: true,
                        users: this.props.users.sort((a, b) => ('' + b.users_username).localeCompare(a.users_username))
                    })
                }, 200)
            }
        });
    }
    deleteProfile(value){
        this.props.dispatch(removeAuthor({ users_id: value }));
        this.setState(() => ({
            users: this.state.users.filter((user) => value !== user.users_id)
        }));
        let data = {
            "userid": value
        }
        fetch(`/deleteUser/${value}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'cors',
            body: JSON.stringify(data)
        })
        .then((res) => {
            return res.json();
        })
    }
    toggleSortFirstName(){
        if (this.state.firstName.firstNameAscendingSort) {
            this.setState({
                users: this.state.users.sort((a, b) => ('' + b.users_firstname).localeCompare(a.users_firstname)),
                firstName: { firstNameAscendingSort: false, firstNameIcon: "▼" },
                lastName: { lastNameAscendingSort: null, lastNameIcon: "•" },
                email: { emailAscendingSort: null, emailIcon: "•" },
                username: { usernameAscendingSort: null, usernameIcon: "•" }
            })
        } else if (!this.state.firstName.firstNameAscendingSort) {
            this.setState({
                users: this.state.users.sort((a, b) => ('' + a.users_firstname).localeCompare(b.users_firstname)),
                firstName: { firstNameAscendingSort: true, firstNameIcon: "▲" },
                lastName: { lastNameAscendingSort: null, lastNameIcon: "•" },
                email: { emailAscendingSort: null, emailIcon: "•" },
                username: { usernameAscendingSort: null, usernameIcon: "•" }
            })
        }
    }
    toggleSortLastName(){
        if (this.state.lastName.lastNameAscendingSort) {
            this.setState({
                users: this.state.users.sort((a, b) => ('' + b.users_lastname).localeCompare(a.users_lastname)),
                firstName: { firstNameAscendingSort: null, firstNameIcon: "•" },
                lastName: { lastNameAscendingSort: false, lastNameIcon: "▼" },
                email: { emailAscendingSort: null, emailIcon: "•" },
                username: { usernameAscendingSort: null, usernameIcon: "•" }
            })
        } else if (!this.state.lastName.lastNameAscendingSort) {
            this.setState({
                users: this.state.users.sort((a, b) => ('' + a.users_lastname).localeCompare(b.users_lastname)),
                firstName: { firstNameAscendingSort: null, firstNameIcon: "•" },
                lastName: { lastNameAscendingSort: true, lastNameIcon: "▲" },
                email: { emailAscendingSort: null, emailIcon: "•" },
                username: { usernameAscendingSort: null, usernameIcon: "•" }
            })
        }
    }
    toggleSortEmail(){
        if (this.state.email.emailAscendingSort) {
            this.setState({
                users: this.state.users.sort((a, b) => ('' + b.users_email).localeCompare(a.users_email)),
                firstName: { firstNameAscendingSort: null, firstNameIcon: "•" },
                lastName: { lastNameAscendingSort: null, lastNameIcon: "•" },
                email: { emailAscendingSort: false, emailIcon: "▼" },
                username: { usernameAscendingSort: null, usernameIcon: "•" }
            })
        } else if (!this.state.email.emailAscendingSort) {
            this.setState({
                users: this.state.users.sort((a, b) => ('' + a.users_email).localeCompare(b.users_email)),
                firstName: { firstNameAscendingSort: null, firstNameIcon: "•" },
                lastName: { lastNameAscendingSort: null, lastNameIcon: "•" },
                email: { emailAscendingSort: true, emailIcon: "▲" },
                username: { usernameAscendingSort: null, usernameIcon: "•" }
            })
        }
    }
    toggleSortUsername(){
        if (this.state.username.usernameAscendingSort) {
            this.setState({
                users: this.state.users.sort((a, b) => ('' + b.users_username).localeCompare(a.users_username)),
                firstName: { firstNameAscendingSort: null, firstNameIcon: "•" },
                lastName: { lastNameAscendingSort: null, lastNameIcon: "•" },
                email: { emailAscendingSort: null, emailIcon: "•" },
                username: { usernameAscendingSort: false, usernameIcon: "▼" }
            })
        } else if (!this.state.username.usernameAscendingSort) {
            this.setState({
                users: this.state.users.sort((a, b) => ('' + a.users_username).localeCompare(b.users_username)),
                firstName: { firstNameAscendingSort: null, firstNameIcon: "•" },
                lastName: { lastNameAscendingSort: null, lastNameIcon: "•" },
                email: { emailAscendingSort: null, emailIcon: "•" },
                username: { usernameAscendingSort: true, usernameIcon: "▲" }
            })
        }
    }
    render(){
        return (
            <div id="dashboard">
                <DashboardNavigation/>
                <div id="dashboardContainer" className="container-fluid">
                    <div id="dashboardContainer__main">
                        <div id="dashboardContainer__header">
                            <div className="dashboardContainer__dataHeader">
                                <h2>Profiles</h2>
                                <div id="searchBar" className="input-group">
                                    <input id="searchInput" className="form-control" placeholder="Search..."></input>
                                    <div className="input-group-append">
                                        <button className="btn btn-primary" type="button" onClick={() => {
                                            this.props.history.push(`/search/${document.querySelector("#searchInput").value.toLowerCase()}`);
                                        }}>Search</button>
                                    </div>
                                </div>
                            </div>
                            <Link to={`/createProfile`}>
                                <button id="addUserButton" className="btn btn-lg btn-success">Add User</button>
                            </Link>
                        </div>
                        <div id="dashboardContainer__sort">
                            <div><span><b>Sort By:</b></span></div>
                            <div>
                                <span>First Name</span>
                                <button onClick={() => this.toggleSortFirstName()}>
                                    {this.state.firstName.firstNameIcon}
                                </button>
                            </div>
                            <div>
                                <span>Last Name</span>
                                <button onClick={() => this.toggleSortLastName()}>
                                    {this.state.lastName.lastNameIcon}
                                </button>
                            </div>
                            <div>
                                <span>E-Mail</span>
                                <button onClick={() => this.toggleSortEmail()}>
                                    {this.state.email.emailIcon}
                                </button>
                            </div>
                            <div>
                                <span>Username</span>
                                <button onClick={() => this.toggleSortUsername()}>
                                    {this.state.username.usernameIcon}
                                </button>
                            </div>
                        </div>
                        <div id="dashboardContainer__stats">
                            <table>
                                <tbody>
                                    {
                                        this.state.authenticated && this.state.users.length !== 0 ?
                                        this.state.users.map((user) => {
                                            return (
                                                <tr key={user.users_id}>
                                                    <td>
                                                        {user.users_firstname}
                                                    </td>
                                                    <td>
                                                        {user.users_lastname}
                                                    </td>
                                                    <td>
                                                        {user.users_email}
                                                    </td>
                                                    <td>
                                                        <a target="_blank" rel="noopener noreferrer" href={`/author/${user.users_username}`}>
                                                            {user.users_username}
                                                        </a>
                                                    </td>
                                                    <td>
                                                    <Link to={`/editProfile/${user.users_username}`}>
                                                        <button className="btn btn-sm btn-secondary">Edit Profile</button>
                                                    </Link>
                                                    </td>
                                                    <td>
                                                        <Link to={`/updatePassword/${user.users_username}`}>
                                                            <button className="btn btn-sm btn-secondary">Update Password</button>
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <button 
                                                        className="btn btn-sm btn-danger"
                                                        onClick={() => this.deleteProfile(user.users_id)}
                                                        >Delete Profile</button>
                                                    </td>
                                                </tr>
                                            )
                                        }) : <tr><td className="noContent"><span>No Profiles</span></td></tr>
                                    }
                                </tbody>
                            </table>
                        </div>
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

export default connect(mapStateToProps)(DashboardViewProfiles);
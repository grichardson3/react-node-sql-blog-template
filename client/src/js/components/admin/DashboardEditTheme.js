import React, { Component } from 'react';
import { connect } from 'react-redux';

import DashboardNavigation from './DashboardNavigation';
import { editTheme } from '../../actions/theme';

class DashboardEditTheme extends Component {
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
        if (this.props.theme.length !== 0) {
            document.title = this.props.theme[0].theme_title;
        }
        return (
            <div>
                <DashboardNavigation/>
                <div id="dashboardContainer" className="container">
                    <div id="dashboardContainer__main">
                        <h2>Edit Theme</h2>
                        <div>
                            {
                                this.state.authenticated ?
                                this.props.theme.map((theme) => {
                                    return (
                                        <div className="row" key={theme.theme_title}>
                                            <div className="col col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                                <label>Theme Title</label>
                                                <input id="title" className="form-control" defaultValue={theme.theme_title}/>
                                            </div>
                                            <div className="col col-xs-12 col-sm-6 col-md-3 col-lg-3">
                                                <label>Body Color <br></br>(Hex Value)</label>
                                                <input id="colorBody" className="form-control" defaultValue={theme.theme_colorBody}/>
                                            </div>
                                            <div className="col col-xs-12 col-sm-6 col-md-3 col-lg-3">
                                                <label>Container Color <br></br>(Hex Value)</label>
                                                <input id="colorContainer" className="form-control" defaultValue={theme.theme_colorContainer}/>
                                            </div>
                                            <div className="col col-xs-12 col-sm-6 col-md-3 col-lg-3">
                                                <label>Navigation Color <br></br>(Hex Value)</label>
                                                <input id="colorNavigation" className="form-control" defaultValue={theme.theme_colorNavigation}/>
                                            </div>
                                            <div className="col col-xs-12 col-sm-6 col-md-3 col-lg-3">
                                                <label>Graph Color <br></br>(Hex Value)</label>
                                                <input id="colorGraph" className="form-control" defaultValue={theme.theme_colorGraph}/>
                                            </div>
                                            <div className="col col-xs-12 col-sm-6 col-md-4 col-lg-4">
                                                <label>Heading Font</label>
                                                <select id="fontHeading" className="form-control" defaultValue={theme.theme_fontHeading}>
                                                    <option>Roboto Slab</option>
                                                    <option>Roboto</option>
                                                </select>
                                            </div>
                                            <div className="col col-xs-12 col-sm-6 col-md-4 col-lg-4">
                                                <label>Paragraph Font</label>
                                                <select id="fontParagraph" className="form-control" defaultValue={theme.theme_fontParagraph}>
                                                    <option>Roboto Slab</option>
                                                    <option>Roboto</option>
                                                </select>
                                            </div>
                                            <div className="col col-xs-12 col-sm-6 col-md-4 col-lg-4">
                                                <label>Details Font</label>
                                                <select id="fontDetails" className="form-control" defaultValue={theme.theme_fontDetails}>
                                                    <option>Roboto Slab</option>
                                                    <option>Roboto</option>
                                                </select>
                                            </div>
                                            <div className="col col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                                <br></br>
                                                <button className="btn btn-primary" onClick={() => {
                                                    let data = {
                                                        theme_title: document.querySelector("#title").value,
                                                        theme_colorBody: document.querySelector("#colorBody").value,
                                                        theme_colorContainer: document.querySelector("#colorContainer").value,
                                                        theme_colorNavigation: document.querySelector("#colorNavigation").value,
                                                        theme_colorGraph: document.querySelector("#colorGraph").value,
                                                        theme_fontHeading: document.querySelector("#fontHeading").value,
                                                        theme_fontParagraph: document.querySelector("#fontParagraph").value,
                                                        theme_fontDetails: document.querySelector("#fontDetails").value
                                                    }
                                                    fetch("/saveTheme", {
                                                        method: 'PUT',
                                                        headers: {
                                                            'Content-Type': 'application/json',
                                                            'Access-Control-Allow-Origin': '*'
                                                        },
                                                        mode: 'cors',
                                                        body: JSON.stringify(data)
                                                    })
                                                    .then((response) => {

                                                        // Checks HTTP status code before editing theme

                                                        if (response.status >= 500) {
                                                            throw new Error("Server error.");
                                                        } else if (response.status < 500 && response.status >= 400) {
                                                            throw new Error("Page error.");
                                                        } else if (response.status < 400) {
                                                            this.props.dispatch(editTheme(data));
                                                            return response.json();
                                                        }
                                                    });
                                                }}>Submit</button>
                                            </div>
                                        </div>
                                    )
                                }) : <span>Loading...</span>
                            }
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
            users: state.users,
            theme: state.theme
    }
}

export default connect(mapStateToProps)(DashboardEditTheme);
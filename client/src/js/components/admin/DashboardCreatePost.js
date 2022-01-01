import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';

import { connect } from 'react-redux';
import { addPost } from '../../actions/posts';
import DashboardNavigation from './DashboardNavigation';
import createPostValidation from './scripts/createPostValidation';

let thing = '';

class DashboardCreatePost extends Component {
    constructor(props){
        super(props);
        this.state = {
            authenticated: false,
            username: ''
        }
    }
    componentDidMount(){
        if (document.querySelector("#featurephoto")) {
            document.querySelector("#featurephoto").addEventListener('change', () => {
                const toDataURL = (src, callback, outputFormat) => {
                    var img = new Image();
                    img.crossOrigin = 'Anonymous';
                    img.onload = function() {
                        var canvas = document.createElement('CANVAS');
                        var ctx = canvas.getContext('2d');
                        let dataURL;
                
                        canvas.width = this.naturalWidth;
                        canvas.height = this.naturalHeight;
                
                        ctx.drawImage(this, 0, 0);
                
                        dataURL = canvas.toDataURL(outputFormat);
                
                        callback(dataURL);
                    };
                    img.src = src;
                    if (!img.complete || img.complete === undefined) {
                        img.src = "data:image/png;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="; // empty value
                        img.src = src;
                    }
                }
                toDataURL(
                    `${document.querySelector('#featurephoto').value}`,
                    function(dataURL) {
                        thing = dataURL;
                    }
                );
            });
        }

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
                this.setState({
                    authenticated: true
                })
                localStorage.setItem("username", userData[0].users_username);
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
                            <h1>Create Post</h1>
                            <Link to={'/dashboard'}>
                                <button className='btn btn-danger'>Cancel</button>
                            </Link>
                        </div>
                        <span>Form fields with a <b>*</b> are required in order for your profile to be created</span>
                        <br></br><br></br>
                        <div className="statusMessages"></div>
                        {
                            this.state.authenticated &&
                            <div className="addPost">
                                <div className="row">
                                    <div className="col col-xs-12 col-md-12">
                                        <label>Post Title *</label>
                                        <input id="posttitle" className="form-control" name="posttitle"/>
                                    </div>
                                    <div className="col col-xs-12 col-md-9">
                                        <label>Feature Photo (Image URL)</label><br></br>
                                        <input id="featurephoto" className="form-control" type="text" name="img"/>
                                    </div>
                                    <div className="col col-xs-12 col-md-3">
                                        <label>Post Tag</label>
                                        <input id="posttag" className="form-control" name="posttag"/>
                                    </div>
                                    <div className="col col-xs-12 col-md-12">
                                        <label>Post Content *</label>
                                        <Editor
                                            initialValue="This is the initial content of the editor."
                                            init={{
                                                height: 420,
                                                menubar: false,
                                                plugins: [
                                                    'advlist autolink lists link image charmap print preview anchor',
                                                    'searchreplace visualblocks code fullscreen',
                                                    'insertdatetime media table paste code help wordcount'
                                                ],
                                                toolbar: 'undo redo | formatselect | ' +
                                                'bold italic backcolor | alignleft aligncenter ' +
                                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                                'removeformat | help',
                                                content_style: 'body { font-family: Helvetica, Arial, sans-serif; font-size: 14px }'
                                            }}
                                        />
                                    </div>
                                    <div className="col col-xs-12 col-md-12">
                                        <button
                                            className="btn btn-secondary"
                                            onClick={() => {
                                                let data = {
                                                    post_author: localStorage.getItem("username"),
                                                    post_date: JSON.parse(Math.floor(Date.now() / 1000)),
                                                    post_featurephoto: thing,
                                                    post_title: document.querySelector("#posttitle").value,
                                                    post_content: document.querySelector(".tox-edit-area__iframe").contentDocument.body.innerText,
                                                    post_tag: document.querySelector("#posttag").value,
                                                }
                                                const validationStatus = createPostValidation(data);
                                                if (validationStatus.length === 0) {
                                                    fetch("/addPost", {
                                                        method: 'POST',
                                                        headers: {
                                                            'Content-Type': 'application/json',
                                                            'Access-Control-Allow-Origin': '*'
                                                        },
                                                        mode: 'cors',
                                                        body: JSON.stringify(data)
                                                    })
                                                    .then((response) => {

                                                        // Checks HTTP status code before adding post

                                                        if (response.status >= 200 && response.status < 400) {
                                                            localStorage.removeItem("post_id");
                                                            this.props.dispatch(addPost(data));
                                                            this.props.history.push("/viewPosts");
                                                        } else if (response.status >= 400 && response.status < 500) {
                                                            const editStatus = document.createElement("span");
                                                            editStatus.textContent = "A page error has occured";
                                                            document.querySelector(".addPost").appendChild(editStatus);
                                                        } else if (response.status >= 500) {
                                                            const editStatus = document.createElement("span");
                                                            editStatus.textContent = "A server error has occured";
                                                            document.querySelector(".addPost").appendChild(editStatus);
                                                        }
                                                    });
                                                    fetch("/incrementUserPostAmount", {
                                                        method: 'PUT',
                                                        headers: {
                                                            'Content-Type': 'application/json',
                                                            'Access-Control-Allow-Origin': '*'
                                                        },
                                                        mode: 'cors',
                                                        body: JSON.stringify({ "id": sessionStorage.getItem("usernameOrEmail") })
                                                    })
                                                    .then((response) => {
                                                        if (response.status >= 500) {
                                                            throw new Error("Server error.");
                                                        } else if (response.status < 500 && response.status >= 400) {
                                                            throw new Error("Page error.");
                                                        } else if (response.status < 400) {
                                                            return response.json();
                                                        }
                                                    })
                                                    fetch("/incrementTotalPostAmount", {
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

export default connect(mapStateToProps)(DashboardCreatePost);
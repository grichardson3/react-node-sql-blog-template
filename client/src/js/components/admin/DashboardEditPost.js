import React, { Component } from 'react';
import ReactGA from 'react-ga';
import { Editor } from '@tinymce/tinymce-react';

import { connect } from 'react-redux';
import { editPost } from '../../actions/posts';
import DashboardNavigation from './DashboardNavigation';

ReactGA.initialize('G-RTLFZS92ZM');
ReactGA.pageview(window.location.pathname + window.location.search);

class DashboardEditPost extends Component {
    constructor(props){
        super(props);
        this.state = {
            authenticated: false
        }
    }
    componentDidMount(){
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
                        <h1>Edit Post</h1>
                        {
                            this.state.authenticated &&
                            // eslint-disable-next-line
                            this.props.posts.map((post) => {
                                if (post.post_id && post.post_id === JSON.parse(window.location.href.split("/")[window.location.href.split("/").length - 1])) {
                                    localStorage.setItem("post_id", post.post_id);
                                    return (
                                        <div className="editPost" key={post.post_id}>
                                            <div className="row">
                                                <div className="col col-xs-12 col-md-12">
                                                    <label>Post Title</label>
                                                    <input id="posttitle" className="form-control" name="posttitle" defaultValue={post.post_title}/>
                                                </div>
                                                <div className="col col-xs-12 col-md-9">
                                                    <label>Feature Photo</label>
                                                    <input id="featurephoto" className="form-control" name="featurephoto" defaultValue={post.post_featurephoto}/>
                                                </div>
                                                <div className="col col-xs-12 col-md-3">
                                                    <label>Post Tag</label>
                                                    <input id="posttag" className="form-control" name="posttag" defaultValue={post.post_tag}/>
                                                </div>
                                                <div className="col col-xs-12 col-md-12">
                                                    <label>Post Content</label>
                                                    <Editor
                                                        initialValue={post.post_content}
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
                                                                post_id: JSON.parse(localStorage.getItem("post_id")),
                                                                post_featurephoto: document.querySelector("#featurephoto").value,
                                                                post_title: document.querySelector("#posttitle").value,
                                                                post_content: document.querySelector(".tox-edit-area__iframe").contentDocument.body.innerText,
                                                                post_tag: document.querySelector("#posttag").value,
                                                            }
                                                            fetch("/savePost", {
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
                                                                    localStorage.removeItem("post_id");
                                                                    this.props.dispatch(editPost(post.post_id, data));
                                                                    this.props.history.push("/viewPosts");
                                                                } else if (res.status >= 400) {
                                                                    const editStatus = document.createElement("span");
                                                                    editStatus.textContent = "An error has occured";
                                                                    document.querySelector(".editPost").appendChild(editStatus);
                                                                }
                                                            });
                                                        }}
                                                    >Submit</button>
                                                </div>
                                            </div>
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

export default connect(mapStateToProps)(DashboardEditPost);
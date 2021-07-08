import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {
    render(){
        return (
            <header>
                <div id="logoArea">
                    <Link to="/">
                        <img src="../img/mern-blog-logo-white.png" alt="MERN Blog" />
                    </Link>
                </div>
                <div id="headerRightSide">
                    <div id="searchBar" className="input-group">
                        <input id="searchInput" className="form-control" placeholder="Search..."></input>
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="button" onClick={() => {
                                this.props.history.push(`/search/${document.querySelector("#searchInput").value.toLowerCase()}`);
                            }}>Search</button>
                        </div>
                    </div>
                    <Link to="/login">
                        <button className="btn btn-secondary">Login</button>
                    </Link>
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
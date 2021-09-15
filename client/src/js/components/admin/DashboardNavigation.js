import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class DashboardNavigation extends Component {
    render(){
        return (
            <div>
                <div id="dashboardContainer__navigation">
                    <Link to="/dashboard"><h1>MERN Blog Dashboard</h1></Link>
                    <div id="dashboardContainer__navigationItems">
                        <div>
                            <Link to="/dashboard"><span>Home</span></Link>
                            <Link to="/viewPosts"><span>Posts</span></Link>
                            <Link to="/viewProfiles"><span>Profiles</span></Link>
                        </div>
                        <div>
                            <button className="btn btn-secondary" onClick={() => {
                                sessionStorage.clear();
                                this.props.history.push("/login");
                            }}>Log Out</button>
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

export default connect(mapStateToProps)(DashboardNavigation);
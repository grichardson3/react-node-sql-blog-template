import React from 'react';
import { Link } from 'react-router-dom';

const DashboardNavigation = () => (
    <div>
        <div id="dashboardContainer__navigation">
            <Link to="/viewPosts"><h1>MERN Blog Dashboard</h1></Link>
            <ul>
                <div>
                    <Link to="/dashboard"><span>Home</span></Link>
                    <Link to="/viewPosts"><span>Posts</span></Link>
                    <Link to="/viewProfiles"><span>Profiles</span></Link>
                </div>
            </ul>
        </div>
    </div>
)

export default DashboardNavigation;
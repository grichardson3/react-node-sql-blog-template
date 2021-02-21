import React from 'react';
import { Link } from 'react-router-dom';

const SecondPostSection = () => (
    <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 blogPost">
            <Link to="/post/1"><div className="blogPostFeaturePhoto"></div></Link>
            <Link to="/post/1"><h2 className="blogPostTitle">Title</h2></Link>
            <div className="blogPostMetaArea">
                <div>
                    <span>Author: </span>
                    <Link to="/author/1"><span className="blogPostAuthorLink">Anonymous</span></Link>
                </div>
                <span className="blogPostDateText">Date Posted: 12/31/1999</span>
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.</p>
            <div className="blogPostBottomMetaArea">
                <Link to="/post/1"><span className="blogPostReadMore">Read More</span></Link>
                <div>
                    <span className="blogPostTagText">Tags: </span>
                    <Link to="/tag/1"><span className="blogPostIndividualTagText">tag1</span></Link>
                </div>
            </div>
        </div>
    </div>
);

export default SecondPostSection;

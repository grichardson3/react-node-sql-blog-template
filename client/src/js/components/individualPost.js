import React from 'react';
import { Link } from 'react-router-dom';

const IndividualPost = () => (
    <div>
        <div id="individualPostMetaArea">
            <h2 id="individualPostTitle">Title</h2>
            <div id="individualPostBottomMeta">
                <div>
                    <span id="individualPostAuthor">Author: </span>
                    <Link to="/author/1"><span id="individualPostAuthorLink">Anonymous</span></Link>
                </div>
                <div id="individualPostDateViews">
                    <span id="individualPostDate">Date Posted: 12/31/1999</span>
                    <span id="individualPostViews">Page Views: 171</span>
                </div>
            </div>
            <div id="individualPostFeaturePhoto"></div>
            <article id="individualPostArticle">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</article>
            <div id="individualPostTags">
                <span>Tags: </span>
                <Link to="/tag/1"><span className="individualPostIndividualTag">undefined</span></Link>
            </div>
            <ul id="individualPostSocialMediaLinks">
                <li><a href="mailto:example@example.com" target="_blank"><img src="../img/icon/mail.png" alt="Mail" title="Share via Mail"/></a></li>
                <li><a href="https://www.facebook.com" target="_blank"><img src="../img/icon/facebook.png" alt="Facebook" title="Share on Facebook"/></a></li>
                <li><a href="https://www.twitter.com" target="_blank"><img src="../img/icon/twitter.png" alt="Twitter" title="Share on Twitter"/></a></li>
                <li><a href="https://www.linkedin.com" target="_blank"><img src="../img/icon/linkedin.png" alt="LinkedIn" title="Share on LinkedIn"/></a></li>
                <li><a href="https://www.reddit.com" target="_blank"><img src="../img/icon/reddit.png" alt="Reddit" title="Share on Reddit"/></a></li>
            </ul>
        </div>
    </div>
);

export default IndividualPost;

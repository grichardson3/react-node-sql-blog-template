import React from 'react'
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
    <div>
        404: Not Found!
        <Link to="/">Back to Home</Link>
    </div>
);

export default NotFoundPage;
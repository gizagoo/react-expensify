import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
    <div>
        <p>404! Try <Link to="/">Dashboard</Link></p>
    </div>
);

export default NotFoundPage;
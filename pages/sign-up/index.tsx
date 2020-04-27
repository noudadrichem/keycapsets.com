import React from 'react';
import { Router } from 'next/router';
import withGA from 'next-ga';

import GoogleAuth from '../../components/GoogleAuth';
import RedditAuth from '../../components/RedditAuth';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import withData from '../../hooks/withData';

function SignUp() {
    return (
        <div className="container">
            <h1>Sign up</h1>
        </div>
    );
}

export default withGA('UA-115865530-2', Router)(withData(SignUp));

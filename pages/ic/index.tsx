import React, { useEffect } from 'react';
import Router from 'next/router';

function InterestCheckHome() {
    useEffect(() => {
        Router.push('/promote-your-keycapset');
    });
    return null;
}

export default InterestCheckHome;

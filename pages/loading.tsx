import React from 'react';
import { Router } from 'next/router';
import withGA from 'next-ga';

import LoadingKeyboard from '../components/LoadingKeyboard';

function Loading() {
    return <LoadingKeyboard />;
}

export default withGA('UA-115865530-2', Router)(Loading);

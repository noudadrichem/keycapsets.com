import React, { useContext } from 'react';
import withGA from 'next-ga';
import Router from 'next/router';

import '../../assets/styles/main.scss';

import Heading from '../../components/Heading';
import Footer from '../../components/Footer';
import Nav from '../../components/Nav';
import Meta from '../../components/Meta';
import withData from '../../hooks/withData';
import useMe from '../../hooks/useMe';
import { Context } from 'typings';
import context from '../../context';

interface UserEditProps {}

function UserEdit(props: UserEditProps) {
    const { state } = useContext<Context>(context);
    useMe();

    return (
        <>
            <Meta />

            <Nav />
            <div className="container">
                <Heading mainTitle={`Edit my profile`} subTitle="" left />

                <pre>{JSON.stringify(state.user, null, 4)}</pre>
            </div>
            <Footer />
        </>
    );
}

export default withGA('UA-115865530-2', Router)(withData(UserEdit));

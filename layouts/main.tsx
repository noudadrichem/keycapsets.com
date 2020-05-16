import { useContext, useEffect, useState, Children, ReactNode } from 'react';
import { AppProps } from 'next/app';
import { Context } from 'typings';
import { useQuery } from '@apollo/react-hooks';

import Nav from '../components/Nav';
import Footer from '../components/Footer';
import withData from '../hooks/withData';
import Meta from '../components/Meta';

import context from '../context';
import { ME } from '../queries';

interface MainLayoutProps {
    children: any;
}

function MainLayout(props: MainLayoutProps) {
    const { state, dispatch } = useContext<Context>(context);
    const { data: me, loading, error } = useQuery(ME);
    const { children } = props;

    useEffect(() => {
        if (!loading) {
            dispatch({
                type: 'user',
                payload: {
                    user: me.me,
                },
            });
        }
    }, [me]);

    useEffect(() => {
        console.log();
    }, []);

    return (
        <>
            <div className="page-layout">
                {state.isLoggedIn ? 'JAAAA' : 'NEEEEE'}
                <Nav />
                {children}
                <Footer />
            </div>
        </>
    );
}

export default withData(MainLayout);

import React, { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import { User } from '../types/types';
import { ApolloClient, ApolloProvider } from '@apollo/client';

import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Meta from '../components/Meta';
import Modal from '../components/Modal';

import '../assets/styles/main.scss';

import { useApollo } from '../hooks/withData';
import { ME } from '../queries';
import useStore from '../context';
import { Router } from 'next/router';
import { logoutUser } from '../utils/user';

function MyApp({ Component, pageProps }: AppProps) {
    const apolloClient = useApollo(pageProps.initialApolloState);
    const isBrowser = typeof window !== `undefined`;
    const setUser = useStore((state) => state.setUser);

    async function fetchMe() {
        try {
            const { data } = await apolloClient.query({
                query: ME,
                fetchPolicy: 'network-only',
            });
            if (data) {
                setUser(data.me);
                console.log('user...', data.me);
            }
        } catch (err) {
            console.log(err);
            logoutUser('/login'); // TODO Add message of unauth here...
        }
    }

    useEffect(function handleUserSession() {
        if (isBrowser) {
            const token = window.localStorage.getItem('TOKEN');
            if (token !== null) {
                fetchMe();
            }
        }
    });

    const isLargeContainer: boolean = pageProps.isLargeContainer !== undefined ? pageProps.isLargeContainer : true;
    const isNavShown: boolean = pageProps.isNavShown !== undefined ? pageProps.isNavShown : true;
    const isFooterShown: boolean = pageProps.isFooterShown !== undefined ? pageProps.isFooterShown : true;

    return (
        <div className="app">
            <div className="page-layout">
                <ApolloProvider client={apolloClient}>
                    {isNavShown && <Nav isLargeContainer={isLargeContainer} />}
                    <Component {...pageProps} />
                    {isFooterShown && <Footer isLargeContainer={isLargeContainer} />}
                </ApolloProvider>
            </div>
            <Modal />
        </div>
    );
}

export default MyApp;

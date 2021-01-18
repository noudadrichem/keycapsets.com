import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import { Want } from '../types/types';
import { ApolloProvider } from '@apollo/client';
import { ToastContainer } from 'react-toastify';

import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Meta from '../components/Meta';
import Modal from '../components/Modal';

import '../assets/styles/main.scss';
import 'react-toastify/dist/ReactToastify.css';

import { useApollo } from '../hooks/withData';
import { ME } from '../queries';
import useStore from '../context';
import { logoutUser } from '../utils/user';

function MyApp({ Component, pageProps }: AppProps) {
    const apolloClient = useApollo(pageProps.initialApolloState);
    const isBrowser = typeof window !== `undefined`;
    const setUser = useStore((state) => state.setUser);
    const setUserWants = useStore((state) => state.setUserWants);
    const setUserCollections = useStore((state) => state.setUserCollections);

    async function fetchMe() {
        const { data, error } = await apolloClient.query({
            query: ME,
            fetchPolicy: 'network-only',
        });
        if (data) {
            setUser(data.me);
            setUserWants(data.userWants.map((want: Want) => ({ ...want, set: want.set._id })));
            setUserCollections(data.fetchUserCollections);
            // console.log('user...', data.me._id);
        }
        if (error) {
            logoutUser();
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
            <ToastContainer
                // position="top-center"
                autoClose={3500}
                hideProgressBar={true}
                // newestOnTop={false}
                rtl={false}
                pauseOnHover
                closeOnClick
            />
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

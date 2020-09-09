import { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import { User } from 'typings';
import { ApolloClient, ApolloProvider } from '@apollo/client';

import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Meta from '../components/Meta';

import '../assets/styles/main.scss';

import { useApollo } from '../hooks/withData';
import { StateProvider } from '../context';
import { ME } from '../queries';

function MyApp({ Component, pageProps }: AppProps) {
    const [me, setMe] = useState<User>(null);
    const apolloClient = useApollo(pageProps.initialApolloState);
    const isBrowser = typeof window !== `undefined`;

    async function fetchMe() {
        const { data: me } = await apolloClient.query({
            query: ME,
            fetchPolicy: 'network-only',
        });
        if (me) {
            setMe(me.me);
            console.log('user...', me.me);
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

    return (
        <div className="app">
            <Meta />
            <div className="page-layout">
                <StateProvider me={me}>
                    <ApolloProvider client={apolloClient}>
                        <Nav isLargeContainer={isLargeContainer} />
                        <Component {...pageProps} />
                        <Footer isLargeContainer={isLargeContainer} />
                    </ApolloProvider>
                </StateProvider>
            </div>
        </div>
    );
}

export default MyApp;

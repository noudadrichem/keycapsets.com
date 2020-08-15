import { useContext, useEffect, useState } from 'react';
import App, { AppProps } from 'next/app';
import { Context } from 'typings';
import { useQuery } from '@apollo/react-hooks';

import Nav from '../components/Nav';
import Footer from '../components/Footer';
import withData from '../hooks/withData';
import Meta from '../components/Meta';

import '../assets/styles/main.scss';

import context from '../context';
import { ME } from '../queries';

function MyApp({ Component, pageProps }: AppProps) {
    const { state, dispatch } = useContext<Context>(context);
    const { data: me, loading, error } = useQuery(ME);
    const [toggle, setToggle] = useState<boolean>(false);

    const allProps: any = {
        ...pageProps,
    };

    useEffect(() => {
        if (!loading) {
            dispatch({
                type: 'user',
                payload: {
                    user: me.me,
                },
            });
            console.log('app user...', me.me);
        }
    }, [me]);

    const isLargeContainer: boolean = pageProps.isLargeContainer !== undefined ? pageProps.isLargeContainer : true;

    return (
        <div className="app">
            <Meta />
            <div className="page-layout">
                <Nav isLargeContainer={isLargeContainer} />
                <Component {...allProps} />
                <Footer isLargeContainer={isLargeContainer} />
            </div>
        </div>
    );
}

export default withData(MyApp);

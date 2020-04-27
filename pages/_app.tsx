import { AppProps } from 'next/app';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import withData from '../hooks/withData';
import useMe from '../hooks/useMe';
import Meta from '../components/Meta';

function MyApp({ Component, pageProps }: AppProps) {
    useMe();
    console.log({ pageProps });

    return (
        <div className="app">
            <Meta />
            <div className="page-layout">
                <Nav isLargeContainer={pageProps.isLargeContainer !== undefined ? pageProps.isLargeContainer : true} />
                <Component {...pageProps} />
                <Footer />
            </div>
        </div>
    );
}

export default withData(MyApp);

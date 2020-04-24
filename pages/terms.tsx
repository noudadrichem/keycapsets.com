import React from 'react';
import Router from 'next/router';
import withGA from 'next-ga';

import '../assets/styles/main.scss';

import withData from '../hooks/withData';
import Heading from '../components/Heading';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import ButtonLink from '../components/ButtonLink';
import Meta from '../components/Meta';

function Terms() {
    const title = `Terms and Conditions`;
    const description = ``;

    return (
        <>
            <Meta />

            <Nav />
            <div className="terms container">
                <Heading mainTitle={title} subTitle={description} left />

                <div className="text-container">
                    <h4>Use of the Service</h4>
                    <p className="light alinea">
                        This site tracks analytics via Google Analytics. By using this platform you agree that we track
                        views of this site. We don't save sensitive and personal data.
                    </p>

                    <h4>The content</h4>
                    <p className="light alinea">
                        The keycapsets team is not responsible for what people say about or post on this platform. See{' '}
                        <a className="link" href="/upload-statement">
                            this link
                        </a>{' '}
                        for more information about the occured issue.
                    </p>

                    <br />

                    <ButtonLink isLarge href="https://github.com/noudadrichem/keycapsets.com/issues">
                        If you want to leave any suggestions, feedback or feature request you can do so here.
                    </ButtonLink>
                    <br />
                    <br />
                    <p className="light alinea">Or contact us on contact@keycapsets.com</p>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default withGA('UA-115865530-2', Router)(withData(Terms));

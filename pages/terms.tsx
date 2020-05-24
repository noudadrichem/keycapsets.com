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
    const description = `These are the terms and conditions when you use keycapsets.com`;

    return (
        <>
            <Meta title={title} description={description} />

            <div className="terms container">
                <Heading mainTitle={title} subTitle={description} left />

                <div className="text-container">
                    <h4>Use of the Service</h4>
                    <p className="light alinea">
                        This site tracks analytics via Google Analytics. By using this platform you agree that we track
                        views of this site.
                    </p>

                    <h4>User information</h4>
                    <p className="light alinea">
                        Customer and its Authorized Users are able to establish a user account (an “Account”) for the
                        Service.(coming soon)
                        <br />
                        Keycapests has the right to block, cancel or remove your Account, whether chosen by you or
                        allocated by us, at any time. This is when a user violates normal behavior or any other ethical
                        code of conduct. Keycapsets only saves the necessary data required to run the platform. You can
                        by any time delete your account. After this request the user account will be permanently deleted
                        from our servers.
                    </p>

                    <h4>The content</h4>
                    <p className="light alinea">
                        The keycapsets team is not responsible for what people say about or post on this platform. By
                        using the Service, you grant Keycapsets a worldwide, irrevocable, non-exclusive, royalty free
                        license to use all material (including without limitation text, images and other visual
                        material, hereafter referred to as the “User Content”) you upload or post to the Service. You
                        hereby acknowledge that all content as posted to the Service is already publicly available.
                        Keycapsets does not claim ownership of the User Content. Although Keycapsets reserves the right
                        to edit or remove any User Content you upload or post to the Service. This is when a user
                        violates normal behavior or any other ethical code of conduct by using strong language or
                        posting NSFW content.
                    </p>

                    <br />

                    <ButtonLink isLarge href="https://github.com/noudadrichem/keycapsets.com/issues">
                        If you want to leave suggestions, feedback or feature request you can do so here.
                    </ButtonLink>
                    <br />
                    <br />
                    <p className="light alinea">Or contact us on contact@keycapsets.com</p>
                </div>
            </div>
        </>
    );
}

export default withGA('UA-115865530-2', Router)(withData(Terms));

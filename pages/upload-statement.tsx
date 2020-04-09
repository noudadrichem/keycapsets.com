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

function UploadStatement() {
    const title = `Statement about upload incident`;
    const description = ``;

    return (
        <>
            <Meta />

            <Nav />
            <div className="UploadStatement container">
                <Heading
                    mainTitle={title}
                    subTitle={description}
                    left
                />

                <div className="text-container">
                    <p className="light alinea">
                        We're sad to announce we are temporarily closing the website for uploads due to incidents that occurred.<br /><br />
                        After a message on subreddit /r/MK (https://www.reddit.com/r/mechanicalkeyboards) the website received a lot of visitors with lots of favorable reactions and feedback. Unfortunately, some people have abused the free upload pages. Sadly we have no idea who these individuals are and most likely will never know but as a member of this community, I feel heartbroken that these people have the intention of ruining a community platform.<br/><br/>
                        This is a valuable learning moment on our part and if this has offended anyone, we sincerely apologize for it.
                    </p>
                    <p className="light alinea">
                        Keycapsets strives to be a community platform for all mechanical keyboard enthusiasts without any harm from outside the hobby. The responses to the Reddit thread indicated that this is a wanted platform that can fill a gap in the community. That is why we decided to continue development.
                    </p>

                    <p className="light alinea">
                        I want to personally thank the people that notified us from the moment it started you're the real MVPs. I also want to thank all the amazing people who came up with amazing ideas to make this platform even better!
                        <br/>
                        We are working hard to realize this as soon as possible and hope that in the future this platform can help you find your favorite keycap set!
                    </p>

                    <br/>
                    <p className="light alinea">
                        We live and we learn.<br/>
                        Sincerely, Noud &amp; Ryan.
                    </p>

                    <p className="light"><i>
                        P.S. <br/>
                        {/* <div style={{ margin: '0 0 64px 0' }}> */}
                        <ButtonLink isLarge href="https://github.com/noudadrichem/keycapsets.com/issues">If you want to leave suggestions, feedback or feature request you can do so here.</ButtonLink>
                        <br /><br />Or contact us on contact@keycapsets.com
                        {/* </div> */}
                    </i></p>
                </div>

            </div>
            <Footer />
        </>
    )
}

export default withGA('UA-115865530-2', Router)(withData(UploadStatement));

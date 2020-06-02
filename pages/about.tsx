import React from 'react';
import Router from 'next/router';
import withGA from 'next-ga';

import Heading from '../components/Heading';
import ButtonLink from '../components/ButtonLink';
import Meta from '../components/Meta';

interface AboutProps {}

function About() {
    const title = `About Keycapsets`;
    const description = `Made for love of mechanical keyboard, and the trouble of finding a nice overview of existing keycapsets!`;
    return (
        <>
            <Meta title={title} description={description} />
            <div className="about container">
                <Heading mainTitle={title} subTitle={description} left />

                <div className="text-container">
                    <div style={{ margin: '0 0 64px 0' }}>
                        <ButtonLink isLarge href="https://github.com/noudadrichem/keycapsets.com/issues">
                            Report bugs or leave feedback here
                        </ButtonLink>
                    </div>

                    {/* <h4>More about the upload incident</h4>
                <div style={{ margin: '0 0 64px 0' }}>
                    <ButtonLink isLarge href="/upload-statement">
                        We made a statement.
                    </ButtonLink>
                </div> */}

                    <h4 className="alinea-title">The story</h4>
                    <p className="light alinea">
                        Friends came to me enthusiastic about mechanical keyboards. I'm always in to help them find
                        their best keyboard. The second step is ofcource, a nice keycapset!
                    </p>

                    <p className="light alinea">
                        We were surfing and browsing through several websites like Geekhack and other vendor sites. This
                        is where the idea came to mind. One website to rule them all. Just one website with an overview
                        of keysets that are available or will be available soon. I don't want to be a vendor. Let this
                        site be a proxy to your vendor.
                    </p>

                    <h4 className="alinea-title">The goal</h4>
                    <p className="light alinea">
                        The goal is to build and maintain a central place for keycapset related stuff. This site should
                        be an overview of created sets and could also function as inspiration for next designs. But can
                        also function as a 1 stop shop for information about current GBs and ICs. Users can favorite
                        their keycapsets and maintain an overview of what they want and own. Also users are able to have
                        a user profile to share and shill their sets and maybe in the future their builds.
                    </p>

                    <h4 className="alinea-title">For vendors</h4>
                    <p className="light alinea">
                        This site should be an advantage to your business. From overview to single I'll proxy the user
                        to their vendor.
                    </p>

                    <h4 className="alinea-title">For set designers</h4>
                    <p className="light alinea">
                        I want to make it easier for you as a designer to express yourself. <br /> My goal is to make it
                        possible for you to have a single webpage with all the information you need. Such as vendors,
                        renders, previews etc.
                    </p>

                    <h4 className="alinea-title">For explorers</h4>
                    <p className="light alinea">
                        This should be your go-to website to look for keycapsets. I want you to be able to search based
                        on name, type or even the color you like. I want to make it as easy as possible for you to
                        decide what set you should go with on your next build. <br />
                        Event tag your favorite sets and create a user profile.
                    </p>

                    {/* <ButtonLink isLarge href="/sign-up">
                        Excited? Create an account!
                </ButtonLink> */}

                    {/* <h4>Are you liking this project and want to help me maintain this website?</h4>
                <p className="light alinea">
                    I'm not a begging person but folks asks me if they could help me out with the costs of running this project. I don't want to run ads on this site and therefore I'm open to recieve donations to maintain this project.
                </p> */}
                </div>

                {/* <h4>More about the upload incident</h4>
                <div style={{ margin: '0 0 64px 0' }}>
                    <ButtonLink isLarge href="/upload-statement">
                        We made a statement.
                    </ButtonLink>
                </div> */}

                <ButtonLink isLarge href="/sign-up">
                    Excited? Create an account!
                </ButtonLink>

                {/* <h4>Are you liking this project and want to help me maintain this website?</h4>
                <p className="light alinea">
                    I'm not a begging person but folks asks me if they could help me out with the costs of running this project. I don't want to run ads on this site and therefore I'm open to recieve donations to maintain this project.
                </p> */}
            </div>
        </>
    );
}

About.getInitialProps = () => {
    return {
        isLargeContainer: false,
    };
};

export default withGA('UA-115865530-2', Router)(About);

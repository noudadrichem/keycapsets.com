import React from 'react';
import Router from 'next/router';
import withGA from 'next-ga';

import Heading from '../components/Heading';
import ButtonLink from '../components/ButtonLink';
import Meta from '../components/Meta';

interface AboutProps {}

function About() {
    const title = `About Keycapsets`;
    const description = `Made out of love for mechanical keyboards, and the lack of a nice overview of existing keycapsets!`;
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
                        Excited friends came to me with questions about mechanical keyboards. I'm always in to help them
                        find a keyboard that suits them best. The second step is of course... a nice keycapset!
                    </p>

                    <p className="light alinea">
                        We were browsing through several vendors and other websites like Geekhack. At that moment the
                        idea came to mind. One website to rule them all. Just one website with an overview of keycapsets
                        that are available or will be available soon. See this site as a proxy to all the vendors out
                        there.
                    </p>

                    <h4 className="alinea-title">The goal</h4>
                    <p className="light alinea">
                        The goal is to be a hub for keycapset related knowledge. This site should function as an
                        overview of created sets and can also act as an inspiration for new designs. KCS is a
                        1-stop-shop for information about current GBs and ICs. Users are able to add keycapsets they
                        like to their favorites and maintain an overview of what they want and/or own. They'll be able
                        to have a user profile to share and shill out their keycapsets. And in the future their complete
                        builds!
                    </p>

                    <h4 className="alinea-title">For explorers</h4>
                    <p className="light alinea">
                        This could be your go-to website to look for keycapsets. I want you to be able to search based
                        on name, type or even the color you like. I want to make it as easy as possible for you to
                        decide what set you should go with on your next build. <br />
                        You'll be able to add your favorite sets to collections and create a user profile very soon!
                    </p>

                    <h4 className="alinea-title">For vendors</h4>
                    <p className="light alinea">
                        This site could be an advantage to your business. From both the overview and the page with the
                        single set I'll proxy the user to your shop!
                    </p>

                    <h4 className="alinea-title">For set designers</h4>
                    <p className="light alinea">
                        I want to make it easier for you as a designer to express yourself. <br /> My goal is to make it
                        possible for you to have a single webpage with all the information you need. Such as vendors,
                        renders, previews etc.
                    </p>

                    {/* <ButtonLink isLarge href="/sign-up">
                        Excited? Create an account!
                </ButtonLink> */}

                    <h4>Are you liking this project and want to help me maintain this website?</h4>
                    <p className="light alinea">
                        People asked me if they could help me out with the costs of running this project.
                        <br />I don't want to run ads on this site or beg for money in any way. Therefore I'm open to
                        recieve a{' '}
                        <a className="link" href="https://bunq.me/noudadrichem/3/I'm%20liking%20keycapsets!">
                            small donation
                        </a>{' '}
                        to maintain this project. Be sure you can mis it and read some of the{' '}
                        <a className="link" href="/terms">
                            terms
                        </a>
                        !
                    </p>
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

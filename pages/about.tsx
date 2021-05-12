import React from 'react';
import Router from 'next/router';
import withGA from 'next-ga';

import Heading from '../components/Heading';
import ButtonLink from '../components/ButtonLink';
import Meta from '../components/Meta';

interface AboutProps {}

function About() {
    const title = `About Keycapsets.com`;
    const description = `Made out of love for mechanical keyboards, and the lack of a nice overview of existing keycapsets!`;
    return (
        <>
            <Meta title={title} description={description} />
            <div className="about container">
                <Heading mainTitle={title} subTitle={description} left />

                <div className="text-container">
                    <div style={{ margin: '0 0 64px 0' }}>
                        <ButtonLink isLarge href="https://github.com/noudadrichem/keycapsets.com/issues">
                            Leave feedback
                        </ButtonLink>
                    </div>

                    <h4 className="alinea-title">Why?</h4>
                    <p className="light alinea">
                        Excited friends came to me with questions about mechanical keyboards. I'm always in to help anyone find them a
                        keyboard that suits them best. The second step is of course... a nice keycapset! <br />
                        We were browsing through several vendors and other websites like Geekhack. At that moment the idea came to mind. One
                        website to rule them all. Just one website with an overview of keycapsets that are available or will be available
                        soon. This site will help you find the Keycap set that suits your style and helps you buy it!
                    </p>

                    <h4 className="alinea-title">The goal</h4>
                    <p className="light alinea">
                        The goal is to be a hub for keycap set related knowledge. This site should function as an overview of created sets
                        and can also act as an inspiration for new designs. KCS is a 1-stop-shop for information about current GBs and ICs.
                        Users are able to add keycapsets they like to their favorites and maintain an overview of what they want and/or own.
                        They'll be able to have a user profile to share and shill out their keycapsets. And in the future their complete
                        builds!
                    </p>
                    <ButtonLink href="/sign-up">Excited? Create an account!</ButtonLink>
                    <br />
                    <br />

                    <h4 className="alinea-title">For explorers</h4>
                    <p className="light alinea">
                        This should be your go-to website to look for keycap sets. I want you to be able to search based on name, type or
                        even the color you like. I want to make it as easy as possible for you to decide what set you should go with on your
                        next build. <br />
                        Create collections with your favorite sets or make your collection public to show your friends what amazing keycap
                        sets you own!
                    </p>

                    <h4 className="alinea-title">For set designers</h4>
                    <p className="light alinea">
                        KCS goal is to make it easier to run PR for your keycap set. This includes features like:
                        <ul className="list">
                            <li>Customizing your own page with all the data you think is necessary to make your keycap set a success!</li>
                            <li>Run an interest check to collect feedback and insights on opinions on your keycap set!</li>
                            <li>Be able to search by colour to see if someone else have had the same amazing idea you have! </li>
                        </ul>
                        One place to run your a complete interestcheck and groupbuy! <br />
                        <ButtonLink href="/promote-your-keycapset">Read more about it</ButtonLink>
                    </p>

                    <h4 className="alinea-title">For vendors</h4>
                    <p className="light alinea">
                        KCS is an advantage to your business. KCS makes it easier for newcomers and existing folks in the hobby to find
                        their right vendor to buy their keycap set.
                    </p>

                    <h4>Liking the project and want to help me maintain it?</h4>
                    <p className="light alinea">
                        People asked me if they could help me out with the costs of running this project.
                        <br />I don't want to run ads on this site nor beg for money in any way. Therefore I'm open to recieve a{' '}
                        <a className="link" href="https://bunq.me/noudadrichem/3/I'm%20liking%20keycapsets!">
                            small donation
                        </a>{' '}
                        to maintain this project. Be sure you're able to miss the amount and read the{' '}
                        <a className="link" href="/terms">
                            terms
                        </a>
                        !
                    </p>
                </div>
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

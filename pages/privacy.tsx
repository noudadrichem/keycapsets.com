import React from 'react';
import Router from 'next/router';
import withGA from 'next-ga';

import Heading from '../components/Heading';
import ButtonLink from '../components/ButtonLink';
import Meta from '../components/Meta';

function Privacy() {
    const title = `Privacy policy`;

    return (
        <>
            <Meta title={title} />
            <div className="privacy container">
                <Heading mainTitle={title} subTitle="" left />

                <div className="text-container">
                    <div style={{ margin: '0 0 64px 0' }}>
                        <ButtonLink isLarge href="https://github.com/noudadrichem/keycapsets.com/issues">
                            Leave feedback
                        </ButtonLink>
                    </div>

                    <h4 className="alinea-title">Keycapsets uses Google Analytics to track viewer data. KCS only collects this data to </h4>
                    <p className="light alinea">
                        At Keycapsets, we believe that safeguarding personal data is of paramount importance in the execution of our
                        activities. Therefore, we want to give you clear and transparent insight into how we process personal data while
                        using the website and Keycapsets Services. When processing personal data, we hold to the rules and regulations as
                        stated in the General Data Protection Regulation (GDPR).
                    </p>

                    <h4 className="alinea-title">Personal data</h4>
                    <p className="light alinea">
                        Keycapsets provided sign up either with Google or Reddit. Keycapsets saves user IDs, usernames and provided Email
                        addresses for information purposes. You can opt out by emailing to contact@keycapsets.com
                    </p>

                    <h4 className="alinea-title">Security of personal data</h4>
                    <p className="light alinea">
                        Keycapsets ensures adequate security of the personal data that it holds, in line with the applicable legal
                        requirements and guidelines. Keycapsets data is hosted on MongoDB Atlass and inherits their privacy policy regarding
                        data.
                    </p>

                    <h4 className="alinea-title">Right to rectification</h4>
                    <p className="light alinea">
                        You have the right to request rectification of your personal data if the data is incorrect, including the right to
                        have incomplete personal data completed. Users within a Keycapsets account can edit their personal data, account
                        data, and payment details in the profile, account, and store section.
                    </p>

                    <h4 className="alinea-title">Contact</h4>
                    <p className="light alinea">
                        If there are any questions regarding this Privacy Policy, you may contact us using the information below.
                        <ul>
                            <li>The Netherlands</li>
                            <li>Utrecht</li>
                            <li>contact@keycapsets.com</li>
                        </ul>
                    </p>

                    <h4>
                        <i>Are you liking this project and want to help me maintain this website?</i>
                    </h4>
                    <p className="light alinea">
                        People asked me if they could help me out with the costs of running this project.
                        <br />I don't want to run ads on this site or beg for money in any way. Therefore I'm open to recieve a{' '}
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

                {/* <h4>More Privacy the upload incident</h4>
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

Privacy.getInitialProps = () => {
    return {
        isLargeContainer: false,
    };
};

export default withGA('UA-115865530-2', Router)(Privacy);

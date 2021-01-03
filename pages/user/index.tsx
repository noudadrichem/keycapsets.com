import React, { useEffect } from 'react';
import { Router } from 'next/router';
import withGA from 'next-ga';
import { useQuery } from '@apollo/client';
import { USER_WANTS_SETS } from '../../queries';
import Heading from '../../components/Heading';
import LoadingKeyboardIllustration from '../../components/LoadingKeyboardIllustration';
import useStore from '../../context';

import ButtonLink from '../../components/ButtonLink';
import Link from 'next/link';
import GoogleIcon from '../../components/GoogleIcon';
import GoogleAuth from '../../components/GoogleAuth';
import RedditIcon from '../../components/RedditIcon';
import RedditAuth from '../../components/RedditAuth';
import Cards from '../../components/Cards';
import Tabs from '../../components/Tabs';

function User() {
    const user = useStore((state) => state.user);
    const setUserWants = useStore((state) => state.setUserWants);

    // TODO find way to implement this on cache
    const { data: userWantSetsResponse, loading: userWantsLoading } = useQuery(USER_WANTS_SETS, {
        fetchPolicy: 'network-only',
    });

    useEffect(() => {
        if (!userWantsLoading) {
            setUserWants(userWantSetsResponse.userWantsSets);
        }
    }, [userWantSetsResponse]);

    return (
        <div className="container large user">
            {user !== null ? (
                <>
                    <Heading mainTitle="Your likes" subTitle="" left />
                    {userWantsLoading ? (
                        <LoadingKeyboardIllustration />
                    ) : userWantSetsResponse.userWantsSets.length > 0 ? (
                        <div className="cards-container">
                            <Tabs
                                label="Collections:"
                                options={[{ label: 'een', value: 'Een' }]}
                                type="collection"
                                onClick={(tab) => console.log('choses tab=' + tab)}
                            />
                            <Cards keycapsets={userWantSetsResponse.userWantsSets} />
                        </div>
                    ) : (
                        <div>
                            <h3 className="light">No keycapset likes found.</h3>
                            <ButtonLink href="/">Start liking right away!</ButtonLink>
                        </div>
                    )}
                </>
            ) : (
                <>
                    <Heading mainTitle="You're not signed in" subTitle="" left />
                    <h3 className="light">Sign in with your desired platform to start using Keycapsets!</h3>
                    <div className="cards">
                        <div className="card center">
                            <Link href="/sign-up/google">
                                <a>
                                    <GoogleIcon variant="dark" size={64} />
                                    <GoogleAuth disabled={false} text="Login with Google" />
                                </a>
                            </Link>
                        </div>

                        <div className="card center">
                            <Link href="/sign-up/reddit">
                                <a>
                                    <RedditIcon variant="dark" size={64} />
                                    <RedditAuth disabled={false} text="Login with Reddit" />
                                </a>
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

User.getInitialProps = () => {
    return {
        isLargeContainer: true,
    };
};

export default withGA('UA-115865530-2', Router)(User);

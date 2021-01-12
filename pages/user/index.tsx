import React, { useEffect, useState } from 'react';
import { Router } from 'next/router';
import withGA from 'next-ga';
import { useQuery } from '@apollo/client';
import { USER_PAGE } from '../../queries';
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
import { Collection, Keycapset, Want } from '../../types/types';
import { SelectOption } from '../../types/interfaces';

function getOptionsFromCollections(collections: Collection[]): SelectOption[] {
    return collections.map((collection: Collection) => ({
        label: collection.name,
        value: collection.name.toLowerCase().replace(/ /g, '-'),
    }));
}

// TODO optimize user wants fetching...
function User() {
    const user = useStore((state) => state.user);
    const [activeTab, setActiveTab] = useState<SelectOption>(null);
    const { data, loading, error } = useQuery(USER_PAGE, { fetchPolicy: 'network-only' });

    useEffect(() => {
        if (!loading && data.fetchUserCollections) {
            const firstOption = getOptionsFromCollections(data.fetchUserCollections)[0];
            setActiveTab(firstOption);
        }
    }, [data]);

    if (loading) {
        return <LoadingKeyboardIllustration />;
    }
    if (error) {
        console.log(error);
        return '500';
    }

    const { fetchUserCollections: collections } = data;
    const collectionMapped: SelectOption[] = getOptionsFromCollections(data.fetchUserCollections);

    return (
        <div className="container large user">
            {user !== null ? (
                <>
                    <Heading mainTitle="Your collections" subTitle="" left />
                    {loading ? (
                        <LoadingKeyboardIllustration />
                    ) : collectionMapped.length > 0 && activeTab !== null ? (
                        <div className="cards-container">
                            <Tabs
                                label="Collections:"
                                options={collectionMapped}
                                type="collection"
                                onClick={(tab) => setActiveTab(tab)}
                                currentVal={activeTab}
                            />

                            <Cards
                                keycapsets={collections
                                    .find((collection: Collection) => collection.name === activeTab.label)
                                    .wants.map((want: Want) => want.set)}
                            />
                        </div>
                    ) : (
                        <div>
                            <h3 className="light">No keycapsets found.</h3>
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

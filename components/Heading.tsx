import React, { useContext } from 'react';
import { useRouter, NextRouter } from 'next/router';

import SearchSets from './SearchSets';
import Button from './Button';
// import context from '../context';
import { Context } from '../types/interfaces';

interface HeadingProps {
    mainTitle: string;
    subTitle: string;
    left?: boolean;
    isHome?: boolean;
    backgroundColor?: string;
}

function Heading(props: HeadingProps): JSX.Element {
    const { mainTitle, subTitle, isHome = false, left = false, backgroundColor } = props;
    const router: NextRouter = useRouter();

    function pushSignup(e) {
        e.preventDefault();
        console.log('push signup');
        router.push('/sign-up');
    }

    const isLoggedIn = false;
    return (
        <header className={`heading ${left ? 'left' : 'center'}`} style={{ background: backgroundColor }}>
            {subTitle && <h4 className={`title-sub italic ${left ? 'left' : 'center'}`}>{subTitle}</h4>}
            <h1 className={`title no-bold ${left ? 'left' : 'center'}`}>{mainTitle}</h1>

            {isHome && (
                <>
                    {/* <h5 className="title-sub-home">Pimp your mechanical keyboard with 300+ community designed keycapsets. Create your account an stay up to date!</h5> */}
                    <SearchSets />
                    {!isLoggedIn && (
                        <div className="mobile-only">
                            <Button
                                variant="primary"
                                size="md"
                                className="btn-sign-up medium-large"
                                onClick={pushSignup}
                            >
                                Sign up
                            </Button>
                        </div>
                    )}

                    {/* <div className="heading-cta">
                            <Button
                                onClick={() => router.push('/upload/set')}
                                variant="primary"
                                size="md"
                                className='center'
                            >Upload a set
                            </Button>
                            <p>or</p>
                            <Button
                                onClick={() => router.push('/upload/vendor')}
                                variant="secondary"
                                size="md"
                                className='center'
                            >Add as vendor
                            </Button>
                        </div> */}
                </>
            )}
        </header>
    );
}

export default Heading;

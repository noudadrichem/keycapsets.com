import React, { ReactNode, useContext } from 'react';
import { useRouter, NextRouter } from 'next/router';

import SearchSets from './SearchSets';
import Button from './Button';
import useStore from '../context';

interface HeadingProps {
    mainTitle: string;
    subTitle: string;
    left?: boolean;
    isHome?: boolean;
    backgroundColor?: string;
    children?: ReactNode;
}

function Heading(props: HeadingProps): JSX.Element {
    const { mainTitle, subTitle, isHome = false, left = false, backgroundColor, children } = props;
    const router: NextRouter = useRouter();
    const isLoggedIn = useStore((state) => state.isLoggedIn);

    function pushSignup(e) {
        e.preventDefault();
        console.log('push signup');
        router.push('/sign-up');
    }

    return (
        <header
            className={`heading ${left ? 'left' : 'center'} ${isHome ? 'home' : ''}`}
            style={{ background: backgroundColor }}
        >
            <h1 className={`title no-bold ${left ? 'left' : 'center'}`}>{mainTitle}</h1>
            {subTitle && <h4 className={`title-sub ${left ? 'left' : 'center'}`}>{subTitle}</h4>}

            {children && children}

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
                </>
            )}
        </header>
    );
}

export default Heading;

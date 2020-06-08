import React, { useContext } from 'react';
import { useRouter } from 'next/router';

import SearchSets from './SearchSets';
import Button from './Button';
import context from '../context';
import { Context } from 'typings';

interface HeadingProps {
    mainTitle: string;
    subTitle: string;
    left?: boolean;
    isHome?: boolean;
    backgroundColor?: string;
}

function Heading(props: HeadingProps): JSX.Element {
    const { mainTitle, subTitle, isHome = false, left = false, backgroundColor } = props;
    const { state } = useContext<Context>(context);

    return (
        <header className={`heading ${left ? 'left' : 'center'}`} style={{ background: backgroundColor }}>
            <h4 className={`title-sub italic ${left ? 'left' : 'center'}`}>{subTitle}</h4>
            <h1 className={`title no-bold ${left ? 'left' : 'center'}`}>{mainTitle}</h1>

            {isHome && (
                <>
                    {/* <h5 className="title-sub-home">The place for everything keycapset related. Get an overview of created sets and be inspired.</h5> */}
                    <SearchSets />
                    {!state.isLoggedIn && (
                        <div className="mobile-only">
                            <Button variant="primary" size="md" className="btn-sign-up medium-large">
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

import React from 'react';
import Button from './Button';
import { useRouter } from 'next/router';
import Pill from './Pill';
import SearchSets from './SearchSets';

interface HeadingProps {
    mainTitle: string;
    subTitle: string;
    left?: boolean;
    isHome?: boolean;
    backgroundColor?: string;
}

function Heading(props: HeadingProps): JSX.Element {
    const { mainTitle, subTitle, isHome = false, left = false, backgroundColor } = props;
    const router = useRouter();

    return (
        <header className={`heading ${left ? 'left' : 'center'}`} style={{ background: backgroundColor }}>
            <Pill color="gray" text="BETA" />
            <h4 className={`italic ${left ? 'left' : 'center'}`}>{subTitle}</h4>
            <h1 className={`no-bold ${left ? 'left' : 'center'}`}>{mainTitle}</h1>

            {isHome && (
                <>
                    <SearchSets />

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

import React from 'react';
import Button from './Button';
import { useRouter } from 'next/router';


interface HeadingProps {
    mainTitle: string;
    subTitle: string;
    left?: boolean;
    isHome?: boolean;
}

function Heading(props: HeadingProps): JSX.Element {
    const { mainTitle, subTitle, isHome = false, left = false } = props;
    const router = useRouter();

    function ctaUpload() {
        router.push('/upload')
    }

    return (
        <header className={`heading ${left ? 'left' : 'center'}`}>
            <h1 className={`no-bold ${left ? 'left' : 'center'}`}>{ mainTitle  }</h1>
            <h4 className={`italic ${left ? 'left' : 'center'}`}>{ subTitle }</h4>

            {
                isHome && (

                    <Button
                    onClick={ctaUpload}
                    variant="primary"
                    size="md"
                    className='center'
                    >
                    Upload a set or apply as a vendor
                </Button>
                )
            }

        </header>
    )
}

export default Heading;

import React from 'react';
import Router, { useRouter } from 'next/router';
import withGA from 'next-ga';

import Heading from '../../components/Heading';
import ButtonLink from '../../components/ButtonLink';
import Meta from '../../components/Meta';
import { initializeApollo } from '../../hooks/withData';
import { GET_IC_BY_ID } from '../../queries';
import Button from '../../components/Button';

interface InterestCheckProps {
    interestCheck: any;
    isLargeContainer: boolean;
    isNavShown: boolean;
    isFooterShown: boolean;
}

function InterestCheck(props: InterestCheckProps) {
    const { interestCheck } = props;
    const router = useRouter();
    console.log('router', router);

    function startIc() {
        router.push({
            pathname: `${router.asPath}/question/${interestCheck.questions[0]._id}`,
        });
    }

    return (
        <>
            <div className="interest-check container">
                <Heading mainTitle="Interest check" subTitle="" left />

                <Button variant="primary" size="lg" onClick={startIc}>
                    Start Interest check
                </Button>

                <pre>
                    <code>{JSON.stringify(interestCheck, null, 2)}</code>
                </pre>
            </div>
        </>
    );
}

export async function getServerSideProps(context) {
    const props: InterestCheckProps = {
        isLargeContainer: false,
        isNavShown: false,
        isFooterShown: false,
        interestCheck: null,
    };
    try {
        const client = initializeApollo();
        const { data, error } = await client.query({
            query: GET_IC_BY_ID,
            variables: {
                id: context.query.id,
            },
        });

        if (error) {
            throw error;
        }

        props.interestCheck = data.interestCheckById;
    } catch (err) {
        console.log('SSR props err', err);
    }

    return { props };
}

export default withGA('UA-115865530-2', Router)(InterestCheck);

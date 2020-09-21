import React, { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import withGA from 'next-ga';

import Heading from '../../../components/Heading';
import ButtonLink from '../../../components/ButtonLink';
import Meta from '../../../components/Meta';
import { initializeApollo } from '../../../hooks/withData';
import { GET_IC_BY_ID, GET_KEYCAPSET_IC } from '../../../queries';
import Button from '../../../components/Button';
import { Keycapset } from 'typings';
import useInterestCheckStore, { ICStore } from '../../../hooks/useInterestCheckStore';

interface InterestCheckProps {
    keycapset: Keycapset;
    isLargeContainer: boolean;
    isNavShown: boolean;
    isFooterShown: boolean;
}

function InterestCheck(props: InterestCheckProps) {
    const { keycapset } = props;
    const { interestCheck } = keycapset;
    const router = useRouter();
    const { setInterestCheck, setKeycapset, setNextQuestionId } = useInterestCheckStore<any>((state) => ({
        setInterestCheck: state.setInterestCheck,
        setKeycapset: state.setKeycapset,
        setNextQuestionId: state.setNextQuestionId,
    }));

    useEffect(() => {
        setInterestCheck(interestCheck);
        setKeycapset(keycapset);
    }, []);

    function startIc() {
        if (interestCheck.questions.length > 0) {
            setNextQuestionId(interestCheck.questions[1]._id);
        }
        router.push({
            pathname: `${router.asPath}/question/${interestCheck.questions[0]._id}`,
        });
    }

    return (
        <>
            <div className="interest-check container">
                <Meta metaImgUrl={keycapset.metaUrl} />
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
        keycapset: null,
    };
    try {
        const client = initializeApollo();
        const { data, error } = await client.query({
            query: GET_KEYCAPSET_IC,
            variables: {
                slug: context.query.keycapsetSlug,
            },
        });
        if (error) {
            throw error;
        }
        props.keycapset = data.keycapsetBySlug;
    } catch (err) {
        console.log('SSR props err', err);
    }
    return { props };
}

export default withGA('UA-115865530-2', Router)(InterestCheck);

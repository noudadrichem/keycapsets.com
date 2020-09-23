import React, { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import withGA from 'next-ga';

import Meta from '../../../components/Meta';
import { initializeApollo } from '../../../hooks/withData';
import { GET_KEYCAPSET_IC } from '../../../queries';
import Button from '../../../components/Button';
import { Keycapset } from 'typings';
import useInterestCheckStore from '../../../hooks/useInterestCheckStore';
import InterestCheckLayout from '../../../layouts/interestCheckLayout';

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
    const state = useInterestCheckStore<any>((state) => ({
        setInterestCheck: state.setInterestCheck,
        setKeycapset: state.setKeycapset,
        setNextQuestionId: state.setNextQuestionId,
        setInStore: state.setInStore,
        name: keycapset.name,
        accentColor1: keycapset.accentColor1,
        coverImageUrl: keycapset.coverImageUrl,
    }));

    useEffect(() => {
        state.setInterestCheck(interestCheck);
        state.setKeycapset(keycapset);
        console.log(keycapset);
    }, []);

    function startIc() {
        state.setInStore();
        router.push({
            pathname: `${router.asPath}/question/${interestCheck.questions[0]._id}`,
        });
    }

    return (
        <InterestCheckLayout>
            <Meta metaImgUrl={keycapset.metaUrl} />

            {/* <div className="interest-check-start"> */}
            <h1 className="light bold">{state.name} Interest check</h1>
            <h5 className="light">Tailormade Interest check form with analytics, by and for keycapset designers!</h5>
            <Button
                variant="primary"
                size="lg"
                onClick={startIc}
                className="custom"
                style={{
                    backgroundColor: state.accentColor1,
                    marginTop: 32,
                }}
            >
                Fill in form
            </Button>
            {/* </div> */}
        </InterestCheckLayout>
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
        console.log('data...', data);
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

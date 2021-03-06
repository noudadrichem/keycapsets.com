import React, { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import withGA from 'next-ga';
import { useMutation } from '@apollo/client';

import '../../assets/styles/main.scss';

import Meta from '../../components/Meta';
import { initializeApollo } from '../../hooks/withData';
import { GET_KEYCAPSET_IC, START_IC } from '../../queries';
import Button from '../../components/Button';
import { Keycapset } from '../../types/types';
import useInterestCheckStore, { Status } from '../../hooks/useInterestCheckStore';
import InterestCheckLayout from '../../layouts/interestCheckLayout';

import { QuestionContainer } from '../../components/question';
import useStore from '../../context';
import CommentContainer from '../../components/commenting/CommentContainer';

interface InterestCheckProps {
    keycapset: Keycapset;
    isLargeContainer: boolean;
    isNavShown: boolean;
    isFooterShown: boolean;
}

function InterestCheck(props: InterestCheckProps) {
    const { keycapset } = props;
    const { interestCheck } = keycapset;
    const user = useStore((state) => state.user);
    const router = useRouter();
    const [startInterestCheck] = useMutation<any>(START_IC);
    const state = useInterestCheckStore((state) => ({
        setInterestCheck: state.setInterestCheck,
        setKeycapset: state.setKeycapset,
        setInStore: state.setInStore,
        setQuestion: state.setQuestion,
        setStatus: state.setStatus,
        question: state.question,
        name: keycapset.name,
        accentColor1: keycapset.accentColor1,
        accentColor2: keycapset.accentColor2,
        accentColor3: keycapset.accentColor3,
        coverImageUrl: keycapset.coverImageUrl,
        status: state.status,
        reset: state.reset,
    }));

    useEffect(() => {
        if (interestCheck !== null) {
            state.reset();
            interestCheck.questions.sort((a, b) => (a.order < b.order ? -1 : 1));
            state.setInterestCheck(interestCheck);
            state.setKeycapset(keycapset);
        } else {
            // redirectToSet();
        }
    }, []);

    async function startIc() {
        // if (user === null) {
        //     redirectToLogin();
        // } else {
        try {
            // ? Callback to server
            // await startInterestCheck({
            //     variables: {
            //         id: interestCheck._id,
            //     },
            // });
            state.setQuestion({
                idx: 0,
                question: interestCheck.questions[0],
                next: 1,
                previous: -1,
            });
            state.setStatus(Status.Ongoing);
        } catch (err) {
            console.log(err);
        }
        // }
    }

    function redirectToHome() {
        router.push(`/`);
    }
    function redirectToSet() {
        router.push(`/set/${keycapset.slug}`);
    }
    function redirectToCTA() {
        router.push(`/promote-your-keycapset`);
    }
    function redirectToLogin() {
        router.push(`/login?next=${router.asPath}`);
    }
    function redirectToSignUp() {
        router.push(`/sign-up?next=${router.asPath}`);
    }

    function renderStartEnd(props: any) {
        return (
            <div className="start-end">
                <h1 className="light bold">{props.title}</h1>
                <h5 className="light">{props.sub}</h5>
                <span style={{ display: 'flex', marginTop: 24 }}>
                    {props.btn2Text !== null && (
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={props.action2}
                            style={{
                                marginRight: 12,
                            }}
                        >
                            {props.btn2Text}
                        </Button>
                    )}
                    <Button
                        variant="primary"
                        size="lg"
                        onClick={props.action1}
                        className="custom"
                        style={{
                            backgroundColor: state.accentColor1,
                            marginLeft: 12,
                        }}
                    >
                        {props.btn1Text}
                    </Button>
                </span>
            </div>
        );
    }

    return (
        <InterestCheckLayout>
            <Meta title={`Interest check for ${state.name}`} metaImgUrl={keycapset.metaUrl} />

            {interestCheck === null &&
                renderStartEnd({
                    title: `No Interest check found..`,
                    sub: `Run your set via Keycapsets. Get a completely themed landing page and run an interest check for your unique designed keycapset!`,
                    action1: redirectToHome,
                    action2: redirectToCTA,
                    btn1Text: `Go back`,
                    btn2Text: `More info`,
                })}

            {interestCheck !== null && (
                <>
                    {state.status === Status.Start &&
                        renderStartEnd({
                            title: `${state.name} Interest check`,
                            sub: `Tailormade Interest check forms with analytics to run your IC. By and for keycapset designers!`,
                            action1: startIc,
                            action2: redirectToSignUp,
                            btn1Text: 'Fill in form',
                            btn2Text: user === null ? 'Sign Up' : null,
                        })}

                    {state.status === Status.Ongoing && <QuestionContainer />}

                    {state.status === Status.Commenting && <CommentContainer />}

                    {state.status === Status.Done &&
                        renderStartEnd({
                            title: `Thank you for sharing your opinion!`,
                            sub: `That was fast! Do you also want to run your interest check here to get all the insights you need?`,
                            action1: redirectToSet,
                            action2: redirectToCTA,
                            btn1Text: `Go back to ${state.name}`,
                            btn2Text: `Get more info`,
                        })}
                </>
            )}
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

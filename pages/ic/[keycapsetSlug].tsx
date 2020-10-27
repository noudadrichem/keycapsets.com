import React, { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import withGA from 'next-ga';

import '../../assets/styles/main.scss';

import Meta from '../../components/Meta';
import { initializeApollo } from '../../hooks/withData';
import { GET_KEYCAPSET_IC } from '../../queries';
import Button from '../../components/Button';
import { Keycapset } from '../../types/interfaces';
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
    }));

    useEffect(() => {
        console.log(keycapset._id);
        interestCheck.questions.sort((a, b) => (a.order < b.order ? -1 : 1));
        state.setInterestCheck(interestCheck);
        state.setKeycapset(keycapset);
    }, []);

    function startIc() {
        if (user === null) {
            redirectToLogin();
        } else {
            state.setStatus(Status.Ongoing);
            state.setQuestion({
                idx: 0,
                question: interestCheck.questions[0],
                next: 1,
                previous: -1,
            });
        }
    }

    function redirectToSet() {
        router.push(`/set/${keycapset.slug}`);
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
            {state.status === Status.Start &&
                renderStartEnd({
                    title: `${state.name} Interest check`,
                    sub: `Tailormade Interest check forms with analytics to run your IC. By and for keycapset designers!`,
                    action1: startIc,
                    action2: redirectToSignUp,
                    btn1Text: user === null ? 'Login' : 'Fill in form',
                    btn2Text: user === null ? 'Sign Up' : null,
                })}

            {state.status === Status.Ongoing && <QuestionContainer />}

            {state.status === Status.Commenting && <CommentContainer />}

            {state.status === Status.Done &&
                renderStartEnd({
                    title: `Thank you for sharing your opinion!`,
                    sub: `That was fast! Do you also want to run your interest check here to get all the insights you need?`,
                    action1: redirectToSet,
                    action2: () => {
                        console.log('work together');
                        // document.location.href = `mailto:contact@keycapsets.com?subject=I'd like to run my Interest check on Keycapsets!`;
                    },
                    btn1Text: `Go back to ${state.name}`,
                    btn2Text: `Let's work together`,
                })}
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

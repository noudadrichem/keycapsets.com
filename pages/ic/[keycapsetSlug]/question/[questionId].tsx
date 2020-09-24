import React, { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import withGA from 'next-ga';

import Heading from '../../../../components/Heading';
import ButtonLink from '../../../../components/ButtonLink';
import Meta from '../../../../components/Meta';
import { initializeApollo } from '../../../../hooks/withData';
import { GET_IC_BY_ID, GET_QUESTION_BY_ID } from '../../../../queries';
import Button from '../../../../components/Button';
import { useQuery } from '@apollo/client';
import useInterestCheckStore from '../../../../hooks/useInterestCheckStore';
import InterestCheckLayout from '../../../../layouts/interestCheckLayout';
import TextArea from '../../../../components/TextArea';

interface InterestCheckQuestionProps {
    isLargeContainer: boolean;
    isNavShown: boolean;
    isFooterShown: boolean;
    questionId: string;
}

function InterestCheckQuestion(props: InterestCheckQuestionProps) {
    const { questionId } = props;
    const router = useRouter();
    const { data, loading } = useQuery(GET_QUESTION_BY_ID, {
        variables: {
            id: questionId,
        },
    });
    const {
        getFromStore,
        keycapset,
        interestCheck,
        setNextQuestionId,
        setPrevQuestionId,
        nextQuestionId,
        previousQuestionId,
        accentColor1,
        setQuestionIdx,
        currentIdx,
        name,
    } = useInterestCheckStore((state) => ({
        getFromStore: state.getFromStore,
        keycapset: state.keycapset,
        interestCheck: state.interestCheck,
        setNextQuestionId: state.setNextQuestionId,
        setPrevQuestionId: state.setPrevQuestionId,
        setQuestionIdx: state.setQuestionIdx,
        nextQuestionId: state.nextQuestionId,
        previousQuestionId: state.previousQuestionId,
        accentColor1: state.keycapset?.accentColor1,
        currentIdx: state.currentIdx,
        name: state.keycapset.name,
    }));

    useEffect(() => {
        getFromStore();
    }, []);

    useEffect(() => {
        setQuestionState(questionId);
        if (data?.questionById) {
            console.log('has question now...');
        }
    }, [data]);

    function setQuestionState(questionId: string) {
        try {
            const currentQuestionIndex = interestCheck.questions.map((q) => q._id).indexOf(questionId);
            setQuestionIdx(currentQuestionIndex);
            const nextIdx = currentQuestionIndex + 1;
            const prevIdx = currentQuestionIndex - 1;
            const get = (idx: number) => interestCheck.questions[idx];
            const next = get(nextIdx);
            if (next !== undefined) {
                setNextQuestionId(next._id);
            }
            const prev = get(prevIdx);
            if (prev !== undefined) {
                setPrevQuestionId(prev._id);
            }
        } catch {
            console.log('persist from store');
        }
    }
    function nextQuestion() {
        console.log('next question id...', nextQuestionId);
        if (nextQuestionId !== null) {
            router.push({
                pathname: `/ic/${keycapset.slug}/question/${nextQuestionId}`,
            });
        }
    }
    function previousQuestion() {
        console.log('previous question id...', previousQuestionId);
        if (previousQuestionId !== null) {
            router.push({
                pathname: `/ic/${keycapset.slug}/question/${previousQuestionId}`,
            });
        }
    }
    function getTextAreaValue(e) {
        console.log(e.target.value);
    }

    if (loading) {
        return <p>...</p>;
    }

    const { questionById: question } = data;
    return (
        <InterestCheckLayout>
            <div className="question">
                <div className="question-topbar">
                    <label className="label">{name}</label>
                    <label className="label">
                        {currentIdx}/{interestCheck.questions.length}
                    </label>
                </div>
                <h2 className="light">{question.text}</h2>
                {question.description && <p>{question.description}</p>}
                {question.kit && (
                    <div className="question-cover-image">
                        <img
                            className="question-cover-image-src"
                            src={question.kit.imgUrl}
                            alt="base kit of set of interest check"
                        />
                    </div>
                )}
                <TextArea onChange={getTextAreaValue} />
                <div className="question-controls">
                    <Button variant="secondary" onClick={previousQuestion}>
                        Previous
                    </Button>
                    <Button
                        variant="primary"
                        style={{ backgroundColor: accentColor1 }}
                        className="custom"
                        onClick={nextQuestion}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </InterestCheckLayout>
    );
}

export async function getServerSideProps(context) {
    const props: InterestCheckQuestionProps = {
        isLargeContainer: false,
        isNavShown: false,
        isFooterShown: false,
        questionId: context.query.questionId,
    };
    return { props };
}

export default withGA('UA-115865530-2', Router)(InterestCheckQuestion);

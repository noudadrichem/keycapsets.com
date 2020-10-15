import React, { useCallback, useEffect, useState } from 'react';

import Button from '../Button';
import useInterestCheckStore, { Status } from '../../hooks/useInterestCheckStore';
import QuestionAnswerer from './Question';
import { useMutation } from '@apollo/react-hooks';
import { ADD_ANSWER_TO_QUESTION } from '../../queries';
import Arrow from '../Arrow';

function QuestionContainer() {
    const [addQuestionToAnswer] = useMutation(ADD_ANSWER_TO_QUESTION);
    const [answer, setAnswer] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const state = useInterestCheckStore((state) => ({
        question: state.question,
        interestCheck: state.interestCheck,
        name: state.keycapset.name,
        accentColor1: state.keycapset.accentColor1,
        setQuestion: state.setQuestion,
        setStatus: state.setStatus,
    }));

    useEffect(
        function updateQuestion() {
            const question = state.interestCheck.questions[state.question.idx];
            const newQuestionAction = getQuestionState(question._id);
            console.log('newQuestionAction...', newQuestionAction);
            state.setQuestion(newQuestionAction);
        },
        [state.question.idx]
    );

    const getQuestion = (idx: number) => state.interestCheck.questions[idx];

    function getQuestionState(questionId: string) {
        const currentQuestionIndex = state.interestCheck.questions.map((q) => q._id).indexOf(questionId);
        const next = currentQuestionIndex + 1;
        const previous = currentQuestionIndex - 1;
        console.log({ next });
        return {
            question: getQuestion(currentQuestionIndex),
            idx: currentQuestionIndex,
            next,
            previous,
        };
    }

    async function nextQuestion() {
        if (state.question.next < state.interestCheck.questions.length) {
            state.setQuestion({
                idx: state.question.next,
            });
        } else {
            state.setStatus(Status.Commenting);
        }
    }

    function previousQuestion() {
        if (state.question.previous >= 0) {
            state.setQuestion({
                idx: state.question.previous,
            });
        } else {
            /* is on q 1 */
        }
    }

    async function uploadQuestion() {
        try {
            await uploadQuestionAnswer({
                type: state.question.question.type,
                questionId: state.question.question._id,
                text: answer,
            });
        } catch (err) {
            throw err;
        }
    }

    const setAnswerValue = (value: string) => setAnswer(value);

    async function uploadQuestionAnswer(input: any) {
        try {
            setLoading(true);
            const response = await addQuestionToAnswer({
                variables: { input },
            });
            setAnswer('');
            setLoading(false);
            console.log('response...', response);
        } catch (err) {
            state.setStatus(Status.Error);
            throw err;
        }
    }

    return (
        <>
            <div className="question-container">
                <div className="question-topbar">
                    <label className="label">{state.name}</label>
                    <label className="label">
                        {state.question.idx + 1}/{state.interestCheck.questions.length}
                    </label>
                </div>

                {state.question.question && (
                    <QuestionAnswerer getAnswerValue={setAnswerValue} question={state.question.question} />
                )}

                <div className="question-controls">
                    {/* <Button variant="secondary" onClick={previousQuestion}>Previous</Button> */}
                    <span>Or skip</span>
                    <span>
                        <Button
                            variant="primary"
                            style={{ backgroundColor: state.accentColor1 }}
                            className="custom"
                            onClick={nextQuestion}
                            isDisabled={answer === '' || loading}
                        >
                            {state.question.idx + 1 === state.interestCheck.questions.length ? 'Submit' : 'Next'}
                        </Button>
                    </span>
                </div>
            </div>
        </>
    );
}

export default QuestionContainer;

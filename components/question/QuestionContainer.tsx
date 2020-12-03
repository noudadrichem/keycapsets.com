import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';

import Button from '../Button';
import useInterestCheckStore, { Status } from '../../hooks/useInterestCheckStore';
import QuestionAnswerer from './Question';
import { ADD_ANSWER_TO_QUESTION } from '../../queries';
import CheckboxContainer, { CheckboxValue } from '../Checkbox';

function QuestionContainer() {
    const [addAnswerToQuestion] = useMutation(ADD_ANSWER_TO_QUESTION);
    const [answer, setAnswer] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [wantsUpdates, setWantsUpdates] = useState<CheckboxValue>({ checked: true });
    const state = useInterestCheckStore((state) => ({
        question: state.question,
        interestCheck: state.interestCheck,
        name: state.keycapset.name,
        accentColor1: state.keycapset.accentColor1,
        setQuestion: state.setQuestion,
        setStatus: state.setStatus,
    }));

    console.log('questioncontainer...', state);

    const isLastQuestion = false; //state.question.idx + 1 === state.interestCheck.questions.length;

    useEffect(
        function updateQuestion() {
            const question = state.interestCheck.questions[state.question.idx];
            const newQuestionAction = getQuestionState(question._id);
            state.setQuestion(newQuestionAction);
        },
        [state.question.idx]
    );

    const getQuestion = (idx: number) => state.interestCheck.questions[idx];

    function getQuestionState(questionId: string) {
        const currentQuestionIndex = state.interestCheck.questions.map((q) => q._id).indexOf(questionId);
        const next = currentQuestionIndex + 1;
        const previous = currentQuestionIndex - 1;
        return {
            question: getQuestion(currentQuestionIndex),
            idx: currentQuestionIndex,
            next,
            previous,
        };
    }

    async function nextQuestion(skip: boolean) {
        if (state.question.next < state.interestCheck.questions.length) {
            if (!skip) {
                await uploadQuestionAnswer({
                    type: state.question.question.type,
                    questionId: state.question.question._id,
                    text: answer,
                });
            }
            state.setQuestion({
                idx: state.question.next,
            });
        } else {
            state.setStatus(Status.Commenting);
        }
    }

    const setAnswerValue = (value: string) => setAnswer(value);

    async function uploadQuestionAnswer(input: any) {
        console.log('uploadQuestionAnswer...', input);
        try {
            setLoading(true);
            const response = await addAnswerToQuestion({
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
                {/* {isLastQuestion && (
                    <CheckboxContainer
                        className="email-notification"
                        size="m"
                        label={`I'd like to recieve updates by email about ${state.name}`}
                        getVal={(v) => setWantsUpdates(v)}
                        checked={wantsUpdates.checked}
                    />
                )} */}

                {!isLastQuestion && (
                    <a
                        className="btn-skip label"
                        style={{ marginRight: 8, marginBottom: 0 }}
                        onClick={() => nextQuestion(true)}
                    >
                        Skip
                    </a>
                )}

                <Button
                    variant="primary"
                    style={{ backgroundColor: state.accentColor1 }}
                    className="btn-next custom"
                    onClick={() => nextQuestion(false)}
                    isDisabled={answer === '' || loading}
                >
                    {isLastQuestion ? 'Finish' : 'Next'}
                </Button>
            </div>
        </div>
    );
}

export default QuestionContainer;

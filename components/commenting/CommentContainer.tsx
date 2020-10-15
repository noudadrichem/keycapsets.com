import React, { useEffect, useState } from 'react';

import Button from '../Button';
import useInterestCheckStore, { Status } from '../../hooks/useInterestCheckStore';
import { useMutation } from '@apollo/react-hooks';
import { ADD_COMMENT_TO_IC } from '../../queries';
import TextArea from '../TextArea';

function CommentContainer() {
    const [addCommentToIc] = useMutation(ADD_COMMENT_TO_IC);
    const [comment, setComment] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const state = useInterestCheckStore((state) => ({
        question: state.question,
        interestCheck: state.interestCheck,
        name: state.keycapset.name,
        accentColor1: state.keycapset.accentColor1,
        setStatus: state.setStatus,
    }));

    const setCommentValue = (value: string) => setComment(value);

    async function uploadCommentToIC(input: any) {
        try {
            setLoading(true);
            const response = await addCommentToIc({
                variables: { input },
            });
            setComment(null);
            setLoading(false);
            state.setStatus(Status.Done);
            console.log('response...', response);
        } catch (err) {
            state.setStatus(Status.Error);
            throw err;
        }
    }

    function add() {
        const input = {
            interestCheckId: state.interestCheck._id,
            text: comment,
        };
        uploadCommentToIC(input);
    }

    return (
        <>
            <div className="comment-container">
                <div className="comment-topbar">
                    <label className="label">{state.name}</label>
                    <label className="label">
                        {state.question.idx + 1}/{state.interestCheck.questions.length}
                    </label>
                </div>

                <div className="">
                    <h2 className="light">Add a public comment</h2>
                    <label className="label italic">These are public, so be kind.</label>
                    {/* {question.description && <p>{question.description}</p>} */}
                    <TextArea onChange={setCommentValue} />
                </div>

                <div className="comment-controls">
                    {/* <Button variant="secondary" onClick={previousQuestion}>Previous</Button> */}
                    <Button
                        variant="primary"
                        style={{ backgroundColor: state.accentColor1 }}
                        className="custom"
                        onClick={add}
                        isDisabled={comment === ''}
                    >
                        Comment
                    </Button>
                </div>
            </div>
        </>
    );
}

export default CommentContainer;

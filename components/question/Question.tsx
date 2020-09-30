import React, { DOMAttributes, FormEvent } from 'react';
import TextArea from '../TextArea';

export interface QuestionProps {
    question: any;
    getAnswerValue: any;
}

export default function Question(props: QuestionProps) {
    const { question, getAnswerValue } = props;

    return (
        <div className="">
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
            <TextArea onChange={getAnswerValue} />
        </div>
    );
}

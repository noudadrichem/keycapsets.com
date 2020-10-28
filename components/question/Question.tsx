import React, { DOMAttributes, FormEvent } from 'react';
import TextArea from '../TextArea';
import { Question } from '../../types/interfaces';
import MultipleChoiseAnswerer from './MultipleChoiceAnswerer';
import KitsAnswerer from './KitsAnswerer';

export interface QuestionProps {
    question: Question;
    getAnswerValue: any;
}

export default function QuestionAnswerer(props: QuestionProps) {
    const { question, getAnswerValue } = props;

    return (
        <div className="">
            <h3 className="light">{question.text}</h3>
            {question.kit && (
                <div className="question-cover-image">
                    <img
                        className="question-cover-image-src"
                        src={question.kit.imgUrl}
                        alt="base kit of set of interest check"
                    />
                </div>
            )}
            {
                {
                    open: <TextArea onChange={getAnswerValue} />,
                    multiple: <MultipleChoiseAnswerer onChange={getAnswerValue} options={question.options} />,
                    kits: <KitsAnswerer onChange={getAnswerValue} options={question.options} />,
                    single: <MultipleChoiseAnswerer onChange={getAnswerValue} options={question.options} single />,
                }[question.type]
            }
        </div>
    );
}

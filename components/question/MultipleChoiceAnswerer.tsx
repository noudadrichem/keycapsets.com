import React, { useEffect, useState } from 'react';
import { Kit } from '../../types/types';
import { QuestionOption } from '../../types/interfaces';
import CheckboxContainer from '../Checkbox';

type MultipleChoiseAnswererProps = {
    onChange: any;
    options: QuestionOption[];
    single?: boolean;
};

export default function MultipleChoiseAnswerer(props: MultipleChoiseAnswererProps) {
    const { onChange, options, single = false } = props;
    const [answers, setAnswers] = useState([]);
    const labels = answers.map(({ label }) => label);

    function getCheckboxVal(val) {
        const labels = answers.map((val) => val.label);
        if (!single) {
            if (labels.includes(val.label)) {
                const clone = [...answers];
                const idx = labels.indexOf(val.label);
                clone.splice(idx, 1);
                setAnswers(clone);
            } else {
                setAnswers([...answers, val]);
            }
        } else {
            setAnswers([val]);
        }
    }

    useEffect(() => {
        console.log('mutliple answers....', answers);
        onChange(labels.join(';'));
    }, [answers]);

    return (
        <div className="multiple-choice-options">
            {options.map((option, idx) => {
                const isChecked = labels.includes(option.text);
                return (
                    <CheckboxContainer
                        size="l"
                        key={idx}
                        label={option.text}
                        id={idx}
                        getVal={getCheckboxVal}
                        checked={isChecked}
                        className="question-option"
                    />
                );
            })}
        </div>
    );
}

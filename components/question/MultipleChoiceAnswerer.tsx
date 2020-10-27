import React, { useEffect, useState } from 'react';
import CheckboxContainer from '../Checkbox';

export default function MultipleChoiseAnswerer(props: any) {
    const { onChange, options } = props;
    const [answers, setAnswers] = useState([]);
    const labels = answers.map(({ label }) => label);

    function getCheckboxVal(val) {
        console.log('value....', val);
        const labels = answers.map((val) => val.label);
        if (labels.includes(val.label)) {
            const clone = [...answers];
            const idx = labels.indexOf(val.label);
            clone.splice(idx, 1);
            setAnswers(clone);
        } else {
            setAnswers([...answers, val]); // TODO fix this
        }
    }

    useEffect(() => {
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

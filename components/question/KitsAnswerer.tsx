import React, { useEffect, useState } from 'react';
import { Question } from '../../types/types';
import { QuestionOption } from '../../types/interfaces';
import CheckboxContainer from '../Checkbox';

type KitsAnswererProps = {
    onChange: any;
    options: QuestionOption[];
};

export default function KitsAnswerer(props: KitsAnswererProps) {
    const { onChange, options } = props;
    const [answers, setAnswers] = useState([]);
    const labels = answers.map(({ label }) => label);

    function getCheckboxVal(val) {
        const labels = answers.map((val) => val.label);
        if (labels.includes(val.label)) {
            const clone = [...answers];
            const idx = labels.indexOf(val.label);
            clone.splice(idx, 1);
            setAnswers(clone);
        } else {
            setAnswers([...answers, val]);
        }
    }

    useEffect(() => {
        console.log('kits answers....', answers);
        onChange(labels.join(';'));
    }, [answers]);

    return (
        <div className="multiple-choice-options kits">
            {options.map((option: QuestionOption, idx: number) => {
                const label = `${option.kit.name}|${option.kit._id}`;
                const isChecked = labels.includes(label);

                return (
                    <div
                        className={`kits-option ${isChecked ? 'checked' : 'not-checked'}`}
                        onClick={() => getCheckboxVal({ label })}
                    >
                        <div className={`img `}>
                            <img src={option.kit.imgUrl} />
                            <CheckboxContainer
                                size="m"
                                key={idx}
                                id={idx}
                                getVal={() => console.log('heh')}
                                checked={isChecked}
                                className="question-option"
                            />
                        </div>
                        <div className="label-container">
                            <label className={`label`}>{option.kit.name}</label>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

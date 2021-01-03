import * as React from 'react';
import { SelectOption } from '../../types/interfaces';
import Tab from '../Tabs/Tab';

export type TabsProps = {
    className?: string;
    label?: string;
    onClick(tab: SelectOption): void;
    options: SelectOption[];
    type: string;
    currentVal: SelectOption;
};

export default function Tabs(props: TabsProps) {
    // const isActive = id === filters[type];

    console.log('current val...', props.currentVal);
    return (
        <div className={`tabs ${props.className}`}>
            {props.label && <label className="label">{props.label}</label>}
            <div className="tabs-container">
                {props.options.map((tab: SelectOption, idx: number) => (
                    <Tab
                        label={tab.label}
                        type={props.type}
                        id={tab.value}
                        key={idx}
                        onClick={() => props.onClick(tab)}
                        isActive={props.currentVal.value === tab.value}
                    />
                ))}
            </div>
        </div>
    );
}

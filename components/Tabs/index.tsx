import * as React from 'react';
import { SelectOption } from '../../types/interfaces';
import Tab from '../Filters/Tab';

export type TabsProps = {
    className?: string;
    label?: string;
    onClick(tab: string): void;
    options: SelectOption[];
    type: string;
};

export default function Tabs(props: TabsProps) {
    return (
        <div className={`tabs ${props.className}`}>
            {props.label && <label className="label">{props.label}</label>}
            <div className="tabs-container">
                {props.options.map((tab: { label: string; value: string }, idx: number) => (
                    <Tab
                        label={tab.label}
                        type={props.type}
                        id={tab.value}
                        key={idx}
                        onClick={() => props.onClick(tab.value)}
                    />
                ))}
            </div>
        </div>
    );
}

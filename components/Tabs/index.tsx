import React, { useContext } from 'react';
import { InititalState } from 'typings';
import { AVAILABILITY_FILTER } from '../../constants';
import Context from '../../context';
import MultiSelect from '../Multiselect';
import Select from '../Select';
import Tab from './Tab';

interface TabsProps {}

function Tabs(props: TabsProps): JSX.Element {
    const {} = props;
    const state = useContext<InititalState>(Context);

    function resetFilter() {
        state.setGlobalState({
            filters: {
                ...state.filters,
                availabilityFilter: 'none',
                brandFilter: [],
            },
        });
    }

    return (
        <>
            <div className="filters">
                {/* <div className="tabs">
                    <label className="label">Choose your keycap type</label>
                    <ul>
                        {state.tabs.map((tab: String, idx: number) => (
                            <Tab type={CAP_FILTER} id={tab} key={idx} />
                        ))}
                    </ul>
                </div>

                <div className="select">
                    <Select
                        label="Filter caps by type"
                        name="Choose type"
                        onSelectChange={(selectedFilterValue) =>
                            state.setGlobalState({
                                filters: {
                                    ...state.filters,
                                    activeTab: selectedFilterValue,
                                },
                            })
                        }
                        values={state.tabs.map((t) => ({ id: t, name: t }))}
                    />
                </div> */}

                <div>
                    <div className="tabs">
                        <label className="label">Filter availability</label>
                        <ul>
                            {state.availability.map((tab: String, idx: number) => (
                                <Tab type={AVAILABILITY_FILTER} id={tab} key={idx} />
                            ))}
                            <li>
                                {state.filters.availabilityFilter !== 'none' && (
                                    <p className="small light clickable" onClick={resetFilter}>
                                        reset
                                    </p>
                                )}
                            </li>
                        </ul>
                    </div>
                    <div className="select">
                        <Select
                            label="Filter caps by availability"
                            name="Choose availability"
                            onSelectChange={(selectedFilterValue) =>
                                state.setGlobalState({
                                    filters: {
                                        ...state.filters,
                                        availabilityFilter: selectedFilterValue,
                                    },
                                })
                            }
                            values={state.availability.map((t) => ({
                                id: t,
                                name: t,
                            }))}
                        />
                    </div>

                    <div className="brand">
                        <MultiSelect
                            isMulti={true}
                            label="Filter brands"
                            options={state.brand}
                            onChange={(values) => {
                                state.setGlobalState({
                                    filters: {
                                        ...state.filters,
                                        brandFilter: (values || []).map((brand) => brand.value),
                                    },
                                });
                            }}
                        />
                    </div>
                </div>

                <div className="counter">
                    <label className="label">Count:</label>
                    <p className="light">
                        {state.keycapsets.length}/{state.allKeycapsetsCount}
                    </p>
                </div>
            </div>
        </>
    );
}

export default Tabs;

import React, { useContext } from 'react';
import { InititalState, Brand, Profile } from 'typings';
import { AVAILABILITY_FILTER } from '../../constants';
import Context from '../../context';
import MultiSelect from '../Multiselect';
import Select from '../Select';
import Tab from './Tab';

interface TabsProps {}

function Tabs(props: TabsProps): JSX.Element {
    const {} = props;
    const context = useContext<InititalState>(Context);

    function resetFilter() {
        context.setGlobalState({
            filters: {
                ...context.filters,
                availabilityFilter: 'none',
                brandFilter: [],
            },
        });
    }

    function handleBrandFilter(values: Brand[]) {
        context.setGlobalState({
            filters: {
                ...context.filters,
                brandFilter: values.map((b: Brand) => b.value),
            },
        });
    }
    function handleProfileFilter(values: Profile[]) {
        context.setGlobalState({
            filters: {
                ...context.filters,
                brandFilter: values.map((b: Profile) => b.value),
            },
        });
    }

    return (
        <>
            <div className="filters">
                <div className="left-side">
                    <div className="filter availability desktop-only">
                        <label className="label">Filter availability</label>
                        <div className="tabs">
                            {context.availability.map((tab: String, idx: number) => (
                                <Tab type={AVAILABILITY_FILTER} id={tab} key={idx} />
                            ))}
                            <div>
                                {context.filters.availabilityFilter !== 'none' && (
                                    <p className="small light clickable" onClick={resetFilter}>
                                        reset
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="filter availability mobile-only">
                        <Select
                            label="Filter caps by availability"
                            name="Choose availability"
                            onSelectChange={(selectedFilterValue) =>
                                context.setGlobalState({
                                    filters: {
                                        ...context.filters,
                                        availabilityFilter: selectedFilterValue,
                                    },
                                })
                            }
                            values={context.availability.map((t) => ({
                                id: t,
                                name: t,
                            }))}
                        />
                    </div>

                    <div className="filter brand">
                        <MultiSelect
                            isMulti
                            label="Filter brands"
                            options={context.brands}
                            onChange={handleBrandFilter}
                        />
                    </div>

                    <div className="filter profile">
                        <MultiSelect
                            isMulti
                            label="Filter Profile"
                            options={context.profiles}
                            onChange={handleProfileFilter}
                        />
                    </div>
                </div>

                <div className="counter">
                    <label className="label">Keycapsets:</label>
                    <p className="light">{context.allKeycapsetsCount}</p>
                </div>
            </div>
        </>
    );
}

export default Tabs;

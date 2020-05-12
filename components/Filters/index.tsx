import React, { useContext } from 'react';
import { Brand, Profile, Material, Context } from 'typings';
import {
    AVAILABILITY_FILTER,
    AVAILABILITY_OPTIONS,
    PROFILE_OPTIONS,
    MATERIAL_OPTIONS,
    BRAND_OPTIONS,
} from '../../constants';
import context from '../../context';
import MultiSelect from '../Multiselect';
import Select from '../Select';
import Tab from './Tab';

interface TabsProps {}

function Tabs(props: TabsProps): JSX.Element {
    const {} = props;
    const { state, dispatch } = useContext<Context>(context);

    function resetFilter() {
        dispatch({
            type: 'set',
            payload: {
                filters: {
                    ...state.filters,
                    availabilityFilter: 'none',
                    brandFilter: [],
                },
            },
        });
    }

    // TODO: This needs refactoring...
    function handleBrandFilter(values: Brand[]) {
        dispatch({
            type: 'set',
            payload: {
                filters: {
                    ...state.filters,
                    brandFilter: values.map((b: Brand) => b.value),
                },
            },
        });
    }
    function handleProfileFilter(values: Profile[]) {
        dispatch({
            type: 'set',
            payload: {
                filters: {
                    ...state.filters,
                    profileFilter: values.map((b: Profile) => b.value),
                },
            },
        });
    }
    function handleMaterialFilter(values: Material[]) {
        dispatch({
            type: 'set',
            payload: {
                filters: {
                    ...state.filters,
                    materialFilter: values.map((b: Material) => b.value),
                },
            },
        });
    }

    return (
        <>
            <div className="filters">
                <div className="left-side">
                    <div className="filter availability desktop-only">
                        <label className="label">Availability</label>
                        <div className="tabs">
                            {AVAILABILITY_OPTIONS.map((tab: String, idx: number) => (
                                <Tab type={AVAILABILITY_FILTER} id={tab} key={idx} />
                            ))}
                            <div>
                                {state.filters.availabilityFilter !== 'none' && (
                                    <p className="small light clickable" onClick={resetFilter}>
                                        reset
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="filter availability mobile-only">
                        <Select
                            label="Availability"
                            name="Choose availability"
                            onSelectChange={(selectedFilterValue) =>
                                dispatch({
                                    type: 'set',
                                    payload: {
                                        filters: {
                                            ...state.filters,
                                            availabilityFilter: selectedFilterValue,
                                        },
                                    },
                                })
                            }
                            values={AVAILABILITY_OPTIONS.map((t) => ({
                                id: t,
                                name: t,
                            }))}
                        />
                    </div>

                    <div className="filter brand">
                        <MultiSelect isMulti label="Brand" options={BRAND_OPTIONS} onChange={handleBrandFilter} />
                    </div>

                    <div className="filter profile">
                        <MultiSelect isMulti label="Profile" options={PROFILE_OPTIONS} onChange={handleProfileFilter} />
                    </div>

                    <div className="filter material">
                        <MultiSelect
                            isMulti
                            label="Material"
                            options={MATERIAL_OPTIONS}
                            onChange={handleMaterialFilter}
                        />
                    </div>
                </div>

                <div className="counter">
                    <label className="label">Keycapsets:</label>
                    <p className="light">
                        {state.fetchedKeycapsetsLength}/{state.allKeycapsetsCount}
                    </p>
                </div>
            </div>
        </>
    );
}

export default Tabs;

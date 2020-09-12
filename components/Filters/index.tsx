import React, { useContext, useState, useEffect } from 'react';
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
import Arrow from '../Arrow';
import Button from '../Button';
import FilterIcon from '../FilterIcon';
import { motion } from 'framer-motion';

interface FiltersProps {}

function Filters(props: FiltersProps): JSX.Element {
    const {} = props;
    // const { state, dispatch } = useContext<Context>(context);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isExtraFiltersOpen, setIsExtraFilterOpen] = useState<boolean>(false);

    useEffect(function handleToggleOnWindowSize() {
        const isBrowser = typeof window !== `undefined`;
        if (isBrowser) {
            if (window.innerWidth > 826) {
                setIsOpen(true);
                setIsExtraFilterOpen(false);
            }
        }
    }, []);

    // TODO: This needs refactoring...
    function handleBrandFilter(values: Brand[]) {
        console.log('handleBrandFilter');
        // dispatch({
        //     type: 'set',
        //     payload: {
        //         filters: {
        //             ...state.filters,
        //             brandFilter: values.map((b: Brand) => b.value),
        //         },
        //     },
        // });
    }
    function handleProfileFilter(values: Profile[]) {
        console.log('handleProfileFilter');
        // dispatch({
        //     type: 'set',
        //     payload: {
        //         filters: {
        //             ...state.filters,
        //             profileFilter: values.map((b: Profile) => b.value),
        //         },
        //     },
        // });
    }
    function handleMaterialFilter(values: Material[]) {
        console.log('handleMaterialFilter');
        // dispatch({
        //     type: 'set',
        //     payload: {
        //         filters: {
        //             ...state.filters,
        //             materialFilter: values.map((b: Material) => b.value),
        //         },
        //     },
        // });
    }
    function getLabelByAvailability(tab: string): string {
        const labelOptions: any = {
            none: 'All',
            ic: 'Interest Check',
            gb: 'In Groupbuy',
            waiting: 'Awaiting Groupbuy',
            ended: 'Groupbuy Ended',
        };
        return labelOptions[tab];
    }
    function openMobileFilters() {
        setIsOpen(!isOpen);
        setIsExtraFilterOpen(!isExtraFiltersOpen);
    }

    const extraFilterAnimationVariants = {
        open: {
            height: 'auto',
            overflow: 'initial',
        },
        closed: {
            height: 0,
            overflow: 'hidden',
        },
    };

    return (
        <>
            <div className="mobile-toggle" onClick={openMobileFilters}>
                <h5>{isOpen ? 'Close ' : 'Open '}search filters</h5>
                <Arrow color="#566073" size={16} direction={isOpen ? 'top' : 'bottom'} />
            </div>

            <motion.div
                className={`filters-container`}
                animate={isOpen ? 'open' : 'closed'}
                variants={extraFilterAnimationVariants}
            >
                <div className={`filters ${isOpen ? 'open' : 'closed'}`}>
                    <div className="left-side">
                        <div className="more-filters open">
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => setIsExtraFilterOpen(!isExtraFiltersOpen)}
                                className={`${isExtraFiltersOpen ? 'active' : ''} desktop-only`}
                            >
                                <FilterIcon />
                                Filters
                            </Button>
                        </div>

                        <div className="filter availability mobile-only">
                            <Select
                                label="Availability"
                                name="Choose availability"
                                onSelectChange={
                                    (selectedFilterValue) => {
                                        console.log('availaiblility');
                                    }
                                    // dispatch({
                                    //     type: 'set',
                                    //     payload: {
                                    //         filters: {
                                    //             ...state.filters,
                                    //             availabilityFilter: selectedFilterValue.value,
                                    //         },
                                    //     },
                                    // })
                                }
                                values={AVAILABILITY_OPTIONS.map((t) => ({
                                    value: t,
                                    label: getLabelByAvailability(t),
                                }))}
                            />
                        </div>
                    </div>

                    <div className="centered-side">
                        <div className="filter availability desktop-only">
                            <div className="tabs">
                                {AVAILABILITY_OPTIONS.map((tab: string, idx: number) => (
                                    <Tab
                                        label={getLabelByAvailability(tab)}
                                        type={AVAILABILITY_FILTER}
                                        id={tab}
                                        key={idx}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="right-side">
                        <div className="counter">
                            <label className="label">Keycapsets:</label>
                            <p className="light">count here</p>
                        </div>
                    </div>
                </div>

                <motion.div
                    animate={isExtraFiltersOpen ? 'open' : 'closed'}
                    variants={extraFilterAnimationVariants}
                    className="extra-filters"
                >
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
                </motion.div>
            </motion.div>
        </>
    );
}

export default Filters;

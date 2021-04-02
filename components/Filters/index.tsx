import React, { useState, useEffect } from 'react';
import { SelectOption } from '../../types/interfaces';
import { AVAILABILITY_FILTER, AVAILABILITY_OPTIONS, PROFILE_OPTIONS, MATERIAL_OPTIONS, BRAND_OPTIONS } from '../../constants';
import MultiSelect from '../Multiselect';
import Select from '../Select';
import Tab from './Tab';
import Arrow from '../Arrow';
import Button from '../Button';
import FilterIcon from '../FilterIcon';
import { motion } from 'framer-motion';
import useStore, { emptyFilters } from '../../context';
import Plus from '../PlusIcon';

interface FiltersProps {}

function Filters(props: FiltersProps): JSX.Element {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isExtraFiltersOpen, setIsExtraFilterOpen] = useState<boolean>(false);
    const setFilters = useStore((state) => state.setFilters);
    const filters = useStore((state) => state.filters);
    const isDarkMode = useStore((s) => s.isDarkMode);

    useEffect(() => {
        if (typeof window !== `undefined` && window.innerWidth > 826) {
            const hasFilters = filters.brand.length > 0 || filters.type.length > 0 || filters.material.length > 0;
            setIsExtraFilterOpen(hasFilters);
        }
    }, [filters]);

    useEffect(function handleToggleOnWindowSize() {
        if (typeof window !== `undefined` && window.innerWidth > 826) {
            setIsOpen(true);
            setIsExtraFilterOpen(false);
        } else {
            setIsOpen(false);
            setIsExtraFilterOpen(true);
        }
    }, []);

    function handleSelectionFilter(values: SelectOption[], key: string) {
        const mappedValues = values.map(({ value }) => value);
        setFilters({
            ...filters,
            [key]: mappedValues,
        });
    }

    function handleAvailabilityFilter(availability: string) {
        setFilters({
            ...filters,
            availability,
        });
    }

    function getLabelByAvailability(tab: string) {
        const labelOptions = {
            none: 'All',
            ic: 'Interest Check',
            gb: 'In Groupbuy',
            waiting: 'Awaiting Groupbuy',
            ended: 'Groupbuy Ended',
        };
        return labelOptions[tab] as string;
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

    const totalActiveFilters = filters.brand.length + filters.type.length + filters.material.length;

    return (
        <>
            <div className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
                <h5>{isOpen ? 'Close ' : 'Open '}search filters</h5>
                <Arrow color={isDarkMode ? '#f8fafb' : '#364154'} size={16} direction={isOpen ? 'top' : 'bottom'} />
            </div>

            <motion.div className={`filters-container`} animate={isOpen ? 'open' : 'closed'} variants={extraFilterAnimationVariants}>
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
                                Filters({totalActiveFilters})
                            </Button>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => setFilters(emptyFilters)}
                                className={`reset-filters ${totalActiveFilters > 0 ? 'visible' : ''}`}
                            >
                                <Plus rotation={45} color={isDarkMode ? '#f8fafb' : '#364154'} />
                            </Button>
                        </div>

                        <div className="filter availability mobile-only">
                            <Select
                                label="Availability"
                                name="Choose availability"
                                onSelectChange={(val) => handleAvailabilityFilter(val.value)}
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
                                        handleUpdateFilters={() => handleAvailabilityFilter(tab)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="right-side">
                        <div className="counter">
                            <label className="label">Keycapsets:</label>
                            <p className="light">471</p> {/* Quick fix */}
                        </div>
                    </div>
                </div>

                <motion.div
                    animate={isExtraFiltersOpen ? 'open' : 'closed'}
                    variants={extraFilterAnimationVariants}
                    className="extra-filters"
                >
                    <div className="filter brand">
                        <MultiSelect
                            isMulti
                            label="Brand"
                            options={BRAND_OPTIONS}
                            onChange={(values: SelectOption[]) => handleSelectionFilter(values, 'brand')}
                            defaultValue={BRAND_OPTIONS.filter(({ value }) => filters.brand.includes(value))}
                        />
                    </div>

                    <div className="filter profile">
                        <MultiSelect
                            isMulti
                            label="Profile"
                            options={PROFILE_OPTIONS}
                            onChange={(values: SelectOption[]) => handleSelectionFilter(values, 'type')}
                            defaultValue={PROFILE_OPTIONS.filter(({ value }) => filters.type.includes(value))}
                        />
                    </div>

                    <div className="filter material">
                        <MultiSelect
                            isMulti
                            label="Material"
                            options={MATERIAL_OPTIONS}
                            onChange={(values: SelectOption[]) => handleSelectionFilter(values, 'material')}
                            defaultValue={MATERIAL_OPTIONS.filter(({ value }) => filters.material.includes(value))}
                        />
                    </div>
                </motion.div>
            </motion.div>
        </>
    );
}

export default Filters;

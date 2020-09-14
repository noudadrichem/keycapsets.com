import React, { useState, useEffect } from 'react';
import { SelectOption } from 'typings';
import {
    AVAILABILITY_FILTER,
    AVAILABILITY_OPTIONS,
    PROFILE_OPTIONS,
    MATERIAL_OPTIONS,
    BRAND_OPTIONS,
} from '../../constants';
import MultiSelect from '../Multiselect';
import Select from '../Select';
import Tab from './Tab';
import Arrow from '../Arrow';
import Button from '../Button';
import FilterIcon from '../FilterIcon';
import { motion } from 'framer-motion';
import useStore from '../../context';
import { useRouter } from 'next/router';

interface FiltersProps {}

function Filters(props: FiltersProps): JSX.Element {
    const {} = props;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isExtraFiltersOpen, setIsExtraFilterOpen] = useState<boolean>(false);
    const router = useRouter();
    const setFilters = useStore<any>((state) => state.setFilters);
    const filters = useStore<any>((state) => state.filters);

    useEffect(() => {
        const hasUrlQuery = Object.keys(router.query).length;
        console.log({ hasUrlQuery });
        if (hasUrlQuery) {
            const brand = router.query['brand[]'];
            const profile = router.query['type[]'];
            const material = router.query['material[]'];
            const availability = router.query['tab'];
            const routeFilters = {
                name: filters.name,
                brand: brand ? (typeof brand === 'string' ? [brand] : brand) : filters.brand,
                type: profile ? (typeof profile === 'string' ? [profile] : profile) : filters.type,
                material: material ? (typeof material === 'string' ? [material] : material) : filters.material,
                availability: availability ? (availability === 'all' ? '' : availability) : filters.availability,
            };
            console.log({ routeFilters });
            setFilters(routeFilters);
            if (brand || profile || material) {
                setIsExtraFilterOpen(true);
            }
        }
    }, [router.query]);

    useEffect(function handleToggleOnWindowSize() {
        const isBrowser = typeof window !== `undefined`;
        if (isBrowser) {
            if (window.innerWidth > 826) {
                setIsOpen(true);
                setIsExtraFilterOpen(false);
            }
        }
    }, []);

    function handleSelectionFilter(values: SelectOption[], key: string) {
        const mappedValues = values.map(({ value }) => value);
        const query = {
            ...router.query,
            [`${key}[]`]: mappedValues,
        };
        router.push(
            {
                pathname: `/`,
                query,
            },
            undefined,
            { shallow: true }
        );
        setFilters({
            ...filters,
            [key]: mappedValues,
        });
    }

    function handleBrandFilter(values: SelectOption[]) {
        handleSelectionFilter(values, 'brand');
    }
    function handleProfileFilter(values: SelectOption[]) {
        handleSelectionFilter(values, 'type');
    }
    function handleMaterialFilter(values: SelectOption[]) {
        handleSelectionFilter(values, 'material');
    }
    function handleAvailabilityFilter(availability: string) {
        router.push(
            {
                pathname: `/`,
                query:
                    availability !== 'none'
                        ? {
                              tab: availability,
                          }
                        : null,
            },
            undefined,
            { shallow: true }
        );

        setFilters({
            ...filters,
            availability,
        });
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

    console.log('___', { filters });
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
                                onSelectChange={(val) => {
                                    console.log('availability mobile...', val);
                                    handleAvailabilityFilter(val);
                                }}
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
                        <MultiSelect
                            isMulti
                            label="Brand"
                            options={BRAND_OPTIONS}
                            onChange={handleBrandFilter}
                            defaultValue={BRAND_OPTIONS.filter(({ value }) => filters.brand.includes(value))}
                        />
                    </div>

                    <div className="filter profile">
                        <MultiSelect
                            isMulti
                            label="Profile"
                            options={PROFILE_OPTIONS}
                            onChange={handleProfileFilter}
                            defaultValue={PROFILE_OPTIONS.filter(({ value }) => filters.type.includes(value))}
                        />
                    </div>

                    <div className="filter material">
                        <MultiSelect
                            isMulti
                            label="Material"
                            options={MATERIAL_OPTIONS}
                            onChange={handleMaterialFilter}
                            defaultValue={MATERIAL_OPTIONS.filter(({ value }) => filters.material.includes(value))}
                        />
                    </div>
                </motion.div>
            </motion.div>
        </>
    );
}

export default Filters;

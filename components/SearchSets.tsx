import React, { useEffect } from 'react';
import useInput from '../hooks/useInput';
import { useRouter, NextRouter } from 'next/router';
import useStore from '../context';
import SearchIcon from './SearchIcon';
import { ALL_OPTIONS, AVAILABILITY_FILTER, BRAND_FILTER, MATERIAL_FILTER, PROFILE_FILTER } from '../constants';

function SearchSets() {
    const router: NextRouter = useRouter();
    const searchQuery = router.query.search;
    const [searchValue, searchInput, setSearchInputValue] = useInput({
        placeholder: 'E.g. ePBT, Minimal or SA',
        autoFocus: true,
        icon: <SearchIcon size={16} color="#bbc0c9" />,
    });
    const filters = useStore((state) => state.filters);
    const setFilters = useStore((state) => state.setFilters);

    // TODO: this supported the use of search?= query in URL...
    useEffect(() => {
        if (searchQuery !== undefined) {
            // @ts-expect-error
            setSearchInputValue(searchQuery);
            setFilters({
                ...filters,
                name: Array.isArray(searchQuery) ? searchQuery[0] : searchQuery,
            });
        }
    }, []);

    useEffect(() => {
        if (searchValue !== undefined && searchValue.toString().length > 0) {
            filterOnOptions(searchValue as string);
        }
    }, [searchValue]);

    function filterOnOptions(searchValue: string) {
        const match = (a, b) => a.some((v) => b.includes(v));
        const keywords = searchValue.toLowerCase().split(' ');

        let toRemove = [];
        let brand = [];
        let material = [];
        let profile = [];
        let availability = 'none';

        ALL_OPTIONS.filter((option) => {
            const label = option.label.toLowerCase().split(' ');
            const value = option.value.toLowerCase().split(' ');
            if (match(keywords, label) || match(keywords, value)) {
                switch (option.type) {
                    case BRAND_FILTER:
                        brand.push(option.value);
                        break;
                    case MATERIAL_FILTER:
                        material.push(option.value);
                        break;
                    case PROFILE_FILTER:
                        profile.push(option.value);
                        break;
                    case AVAILABILITY_FILTER:
                        availability = option.value;
                        break;
                }
                toRemove.push(...label, ...value);
            }
        });

        if (match(keywords, ['pbt']) && !match(keywords, ['epbt', 'enjoy'])) {
            brand = brand.filter((brand: string) => brand !== 'epbt');
        }
        const name = keywords
            .filter((keyword: string) => !toRemove.includes(keyword))
            .join(' ')
            .trim();

        setFilters({
            ...filters,
            type: profile,
            name,
            brand,
            material,
            availability,
        });
    }

    return <div className="search-input">{searchInput}</div>;
}

export default SearchSets;

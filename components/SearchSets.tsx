import React, { useEffect } from 'react';
import useInput from '../hooks/useInput';
import { useRouter, NextRouter } from 'next/router';
import useStore from '../context';
import SearchIcon from './SearchIcon';
import { ALL_OPTIONS, AVAILABILITY_FILTER, BRAND_FILTER, MATERIAL_FILTER, PROFILE_FILTER } from '../constants';

function SearchSets() {
    const router: NextRouter = useRouter();
    const [searchValue, searchInput, setSearchInputValue] = useInput({
        placeholder: 'E.g. Camo',
        autoFocus: true,
        icon: <SearchIcon size={16} color="#bbc0c9" />,
    });
    const filters = useStore((state) => state.filters);
    const setFilters = useStore((state) => state.setFilters);

    // TODO: this supported the use of search?= query in URL...
    useEffect(() => {
        const searchQuery = router.query.search;
        console.log({ searchQuery });
        if (searchQuery !== undefined) {
            // @ts-expect-error
            setSearchInputValue(searchQuery);
            setFilters({
                ...filters,
                name: Array.isArray(searchQuery) ? searchQuery[0] : searchQuery,
            });
        }
    }, [router.query.search]);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            if (searchValue !== '' || searchValue !== undefined) {
                filterOnOptions(searchValue);
            }
        }, 400);

        return () => clearTimeout(timeout);
    }, [searchValue]);

    function filterOnOptions(searchValue) {
        const match = (a, b) => a.some((v) => b.includes(v));
        const keywords = searchValue.toLowerCase().split(' ');

        let toRemove = [];
        let brands = [];
        let materials = [];
        let profiles = [];
        let availability = '';

        // TODO: fix that 'pbt' doesn't always add 'Enjoy BPT' brand sets to result
        ALL_OPTIONS.filter((option) => {
            const label = option.label.toLowerCase().split(' ');
            const value = option.value.toLowerCase().split(' ');
            if (match(keywords, label) || match(keywords, value)) {
                switch (option.type) {
                    case BRAND_FILTER:
                        brands.push(option.value);
                        break;
                    case MATERIAL_FILTER:
                        materials.push(option.value);
                        break;
                    case PROFILE_FILTER:
                        profiles.push(option.value);
                        break;
                    case AVAILABILITY_FILTER:
                        //! It's not possible to search for multiple availability states, because of the API
                        availability = option.value;
                        break;
                }
                toRemove.push(...label, ...value);
            }
        });

        if (match(keywords, ['pbt']) && !match(keywords, ['epbt', 'enjoy'])) {
            brands = brands.filter((brand: string) => brand !== 'epbt');
        }
        const names = keywords
            .filter((keyword: string) => !toRemove.includes(keyword))
            .join(' ')
            .trim();
        setFilters({
            ...filters,
            name: names,
            brand: brands,
            material: materials,
            type: profiles,
            availability: availability,
        });
    }

    return <div className="search-input">{searchInput}</div>;
}

export default SearchSets;

import { Filters } from '../types/interfaces';

export function serialiseFilter(filters: Filters) {
    // TODO challenge, make this nicer.
    const brand = filters.brand.length > 0 ? filters.brand.join(' ') : null;
    const profile = filters.type.length > 0 ? filters.type.join(' ') : null;
    const material = filters.material.length > 0 ? filters.material.join(' ') : null;
    const query = [brand, profile, material, filters.name]
        .filter((t) => t !== null)
        .join(' ')
        .trim();
    return query;
}

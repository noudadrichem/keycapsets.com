import { BRAND_OPTIONS } from '../constants';
import { SelectOption } from '../types/interfaces';

export function getLabelByBrand(brandValue: string): string {
    const brand: SelectOption = BRAND_OPTIONS.find((brand: SelectOption) => brand.value === brandValue);
    if (brand) {
        return brand.label;
    }
}

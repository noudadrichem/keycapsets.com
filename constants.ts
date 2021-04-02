import { SelectOption } from './types/interfaces';

export const BRAND_OPTIONS: SelectOption[] = [
    { value: 'gmk', label: 'GMK' },
    { value: 'epbt', label: 'Enjoy PBT' },
    { value: 'jtk', label: 'JTK' },
    { value: 'sp', label: 'Signature Plastics' },
    { value: 'infinikey', label: 'Infinikey' },
    { value: 'keyreative', label: 'Keyreative' },
    { value: 'taihao', label: 'Tai-Hao' },
    { value: 'maxkey', label: 'MaxKey' },
    { value: 'zfrontier', label: 'zFrontier' },
    { value: 'leopold', label: 'Leopold' },
    { value: 'ducky', label: 'Ducky' },
];

export const MATERIAL_OPTIONS: SelectOption[] = [
    { value: 'abs', label: 'ABS' },
    { value: 'pbt', label: 'PBT' },
];

export const PROFILE_OPTIONS: SelectOption[] = [
    { label: 'Cherry', value: 'cherry' },
    { label: 'SA', value: 'sa' },
    { label: 'DSA', value: 'dsa' },
    { label: 'XDA', value: 'xda' },
    { label: 'MT3', value: 'mt3' },
    { label: 'KAT', value: 'kat' },
    { label: 'KAM', value: 'kam' },
    { label: 'OEM', value: 'oem' },
    { label: 'MDA', value: 'mda' },
    { label: 'DCS', value: 'dcs' },
];

export const NONE = 'none';
export const INTEREST_CHECK = 'ic';
export const WAITING_FOR_GROUPBUY = 'waiting';
export const IN_GROUP_BUY = 'gb';
export const ENDED = 'ended';
export const AVAILABILITY_OPTIONS: string[] = [NONE, INTEREST_CHECK, WAITING_FOR_GROUPBUY, IN_GROUP_BUY, ENDED];

export const AVAILABILITY_FILTER = 'availability';
export const BRAND_FILTER = 'brand';
export const MATERIAL_FILTER = 'material';
export const PROFILE_FILTER = 'profile';
export const CAP_FILTER = 'cap';

export const ALL_OPTIONS = [BRAND_OPTIONS, MATERIAL_OPTIONS, PROFILE_OPTIONS, AVAILABILITY_OPTIONS].reduce((accu, item, idx) => {
    switch (idx) {
        case 0:
            accu.push((item as any).map((brand) => ({ ...brand, type: BRAND_FILTER })) as any);
            break;
        case 1:
            accu.push((item as any).map((material) => ({ ...material, type: MATERIAL_FILTER })) as any);
            break;
        case 2:
            accu.push((item as any).map((profile) => ({ ...profile, type: PROFILE_FILTER })) as any);
            break;
        case 3:
            accu.push(
                (item as any).map((availability) => ({ label: availability, value: availability, type: AVAILABILITY_FILTER })) as any
            );
            break;
    }
    return [].concat.apply([], accu) as any;
}, []);

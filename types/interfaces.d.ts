declare module 'typings' {
    interface Keycapset {
        _id?: string;
        name?: string;
        type?: string;
        material?: string;
        brand?: string;
        designerName?: string;
        groupbuyStartDate?: string;
        groupbuyEndDate?: string;
        active?: boolean;
        coverImageUrl?: string;
        imageUrls?: string[];
        websiteUrl?: string;
        vendors?: Array<Vendor>;
        slug?: string;
        createdAt?: Date;
        updatedAt?: Date;
        accentColor1: string;
        accentColor2: string;
        accentColor3: string;
        isInterestCheck: boolean;
    }

    interface Brand {
        value: string;
        label: string;
    }
    interface Material {
        value: string;
        label: string;
    }
    interface Profile {
        value: string;
        label: string;
    }

    interface Vendor {
        _id?: string;
        socials?: string[];
        name?: string;
        country?: string;
        logoUrl?: string;
        createdAt?: Date;
        updatedAt?: Date;
        url?: string;
        slug?: string;
    }

    interface Filters {
        activeTab: string;
        availabilityFilter: string;
        brandFilter: string[];
        profileFilter: string[];
        materialFilter: string[];
    }

    interface InititalState {
        filters: Filters;
        availability: string[];
        brands: Brand[];
        profiles: Profile[];
        materials: Material[];
        keycapsets: Keycapset[];
        filteredSets: Keycapset[];
        searchQuery: string;
        allKeycapsetsCount: number;
        setGlobalState?: Function;
    }
}

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

    interface InititalState {
        activeTab: string;
        tabs: string[];
        keycapsets: any[];
        searchQuery: string;
        allKeycapsetsCount: number;
        setGlobalState?: Function;
    }
}

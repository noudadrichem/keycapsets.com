declare module 'typings' {
    interface Keycapset {
        _id?: string;
        name?: string;
        type?: string;
        groupbuyStartDate?: Date;
        groupbuyEndDate?: string;
        active?: Boolean;
        coverImageUrl?: string;
        imageUrls?: string[];
        websiteUrl?: string;
        vendors?: Vendor[] | string[];
        slug?: string;
        createdAt?: Date;
        updatedAt?: Date;
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
        tabs: string[],
        keycapsets: any[],
        searchQuery: string;
        setGlobalState?: Function;
    }

}

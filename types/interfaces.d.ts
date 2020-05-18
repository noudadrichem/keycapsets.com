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
        designedBy: string[];
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
        availabilityFilter: string;
        brandFilter: string[];
        profileFilter: string[];
        materialFilter: string[];
    }

    interface InititalState {
        filters: Filters;
        keycapsets: Keycapset[];
        fetchedKeycapsetsLength: number;
        searchQuery: string;
        allKeycapsetsCount: number;
        isLoggedIn: boolean;
        user?: User;
        fetchedKeycapsetsLength: number;
        userWants: string[];
    }

    interface User {
        _id: ID;
        name: string;
        email: string;
        locked: boolean;
        isVendor: boolean;
        geekhackUserName: string;
        redditUserName: string;
        avatar: string;
        locale: string;
        slug: string;
        isVendor: boolean;
        isDesigner: boolean;
    }

    interface Action {
        type: string;
        payload: any;
    }

    interface Context {
        state: InititalState;
        dispatch(action: Action): Function;
    }
}

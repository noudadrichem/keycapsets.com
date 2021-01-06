import { State } from 'zustand';

// export interface Kit {
//     name: string;
//     imgUrl: string;
//     description?: string;
//     _id: string;
// }

// export interface Keycapset {
//     _id?: string;
//     name?: string;
//     type?: string;
//     material?: string;
//     brand?: string;
//     designerName?: string;
//     groupbuyStartDate?: string;
//     groupbuyEndDate?: string;
//     active?: boolean;
//     coverImageUrl?: string;
//     imageUrls?: string[];
//     websiteUrl?: string;
//     vendors?: Array<Vendor>;
//     slug?: string;
//     createdAt?: Date;
//     updatedAt?: Date;
//     accentColor1?: string;
//     accentColor2?: string;
//     accentColor3?: string;
//     isInterestCheck?: boolean;
//     designedBy?: string[];
//     kits?: Kit[];
//     metaUrl?: string;
//     interestCheck?: InterestCheck;
//     description?: string;
// }

// export interface InterestCheck {
//     _id: string;
//     comments: any[];
//     questions: Question[];
// }

export interface QuestionOption {
    text: string;
    kit?: Kit;
}

// export interface Question {
//     _id: string;
//     text: string;
//     kit: Kit;
//     options: QuestionOption[];
//     type: 'open' | 'multiple';
//     order: number;
// }

export interface SelectOption {
    value: string;
    label: string;
}

// export interface Vendor {
//     _id?: string;
//     socials?: string[];
//     name?: string;
//     country?: string;
//     logoUrl?: string;
//     createdAt?: Date;
//     updatedAt?: Date;
//     url?: string;
//     slug?: string;
// }

export interface Filters {
    availability: string;
    name: string;
    brand: string[];
    type: string[];
    material: string[];
}

export interface InititalState extends State {
    filters: Filters;
    keycapsets: Keycapset[];
    searchQuery: string;
    allKeycapsetsCount: number;
    isLoggedIn: boolean;
    user?: User;
    userWants: Keycapset[];
    user: User;
}

// export interface User {
//     _id: ID;
//     name: string;
//     email: string;
//     locked: boolean;
//     isVendor: boolean;
//     geekhackUserName: string;
//     redditUserName: string;
//     avatar: string;
//     locale: string;
//     slug: string;
//     isVendor: boolean;
//     isDesigner: boolean;
// }

export interface Action {
    type: string;
    payload: any;
}

export interface Context {
    state: InititalState;
    dispatch(action: Action): Function;
}

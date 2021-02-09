import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    Date: any;
    Number: any;
    /** The `Upload` scalar type represents a file upload. */
    Upload: any;
};

export type Answer = {
    __typename?: 'Answer';
    text: Scalars['String'];
    type: Scalars['String'];
};

export type AnswerInput = {
    questionId: Scalars['ID'];
    text: Scalars['String'];
    type: Scalars['String'];
};

export type Collection = {
    __typename?: 'Collection';
    name?: Maybe<Scalars['String']>;
    user?: Maybe<User>;
    wants?: Maybe<Array<Maybe<Want>>>;
    public?: Maybe<Scalars['Boolean']>;
};

export type Comment = {
    __typename?: 'Comment';
    text: Scalars['String'];
    user: Scalars['String'];
};

export type CommentInput = {
    interestCheckId: Scalars['ID'];
    text: Scalars['String'];
};

export type GoogleLoginResponse = {
    __typename?: 'GoogleLoginResponse';
    user?: Maybe<User>;
    token: Scalars['String'];
    firstLogin?: Maybe<Scalars['Boolean']>;
};

export type ImgUploadResponse = {
    __typename?: 'ImgUploadResponse';
    name: Scalars['String'];
    url: Scalars['String'];
    thumb: Scalars['String'];
};

export type InterestCheck = {
    __typename?: 'InterestCheck';
    _id?: Maybe<Scalars['String']>;
    comments?: Maybe<Array<Maybe<Comment>>>;
    questions?: Maybe<Array<Maybe<Question>>>;
    createdBy: Scalars['ID'];
    status?: Maybe<Scalars['String']>;
};

export type InterestCheckInput = {
    setId: Scalars['String'];
    questions?: Maybe<Array<Maybe<QuestionInput>>>;
};

export type Keycapset = {
    __typename?: 'Keycapset';
    _id: Scalars['ID'];
    name?: Maybe<Scalars['String']>;
    type?: Maybe<Scalars['String']>;
    groupbuyStartDate?: Maybe<Scalars['Date']>;
    groupbuyEndDate?: Maybe<Scalars['Date']>;
    active?: Maybe<Scalars['Boolean']>;
    coverImageUrl?: Maybe<Scalars['String']>;
    imageUrls?: Maybe<Array<Maybe<Scalars['String']>>>;
    websiteUrl?: Maybe<Scalars['String']>;
    vendors?: Maybe<Array<Maybe<Vendor>>>;
    slug?: Maybe<Scalars['String']>;
    createdAt?: Maybe<Scalars['Date']>;
    updatedAt?: Maybe<Scalars['Date']>;
    status?: Maybe<Scalars['String']>;
    accentColor1?: Maybe<Scalars['String']>;
    accentColor2?: Maybe<Scalars['String']>;
    accentColor3?: Maybe<Scalars['String']>;
    designerName?: Maybe<Scalars['String']>;
    kits?: Maybe<Array<Maybe<Kit>>>;
    brand?: Maybe<Scalars['String']>;
    material?: Maybe<Scalars['String']>;
    isInterestCheck?: Maybe<Scalars['Boolean']>;
    designedBy?: Maybe<Array<Maybe<Scalars['ID']>>>;
    availability?: Maybe<Scalars['String']>;
    interestCheck?: Maybe<InterestCheck>;
    metaUrl?: Maybe<Scalars['String']>;
    description?: Maybe<Scalars['String']>;
    links?: Maybe<Array<Maybe<Scalars['String']>>>;
    sections?: Maybe<Array<Maybe<Section>>>;
};

export type KeycapsetFilter = {
    type?: Maybe<Array<Maybe<Scalars['String']>>>;
    brand?: Maybe<Array<Maybe<Scalars['String']>>>;
    material?: Maybe<Array<Maybe<Scalars['String']>>>;
    name?: Maybe<Scalars['String']>;
    availability?: Maybe<Scalars['String']>;
};

export type KeycapsetInput = {
    name?: Maybe<Scalars['String']>;
    type?: Maybe<Scalars['String']>;
    groupbuyStartDate?: Maybe<Scalars['Date']>;
    groupbuyEndDate?: Maybe<Scalars['Date']>;
    coverImageUrl?: Maybe<Scalars['String']>;
    status?: Maybe<Scalars['String']>;
    accentColor1?: Maybe<Scalars['String']>;
    accentColor2?: Maybe<Scalars['String']>;
    accentColor3?: Maybe<Scalars['String']>;
    designerName?: Maybe<Scalars['String']>;
    brand?: Maybe<Scalars['String']>;
    material?: Maybe<Scalars['String']>;
    isInterestCheck?: Maybe<Scalars['Boolean']>;
};

export type Kit = {
    __typename?: 'Kit';
    _id: Scalars['ID'];
    name: Scalars['String'];
    description?: Maybe<Scalars['String']>;
    type?: Maybe<Scalars['String']>;
    price: Scalars['String'];
    imgUrl: Scalars['String'];
    createdAt?: Maybe<Scalars['Date']>;
    updatedAt?: Maybe<Scalars['Date']>;
};

export type KitInput = {
    name: Scalars['String'];
    description?: Maybe<Scalars['String']>;
    type?: Maybe<Scalars['String']>;
    price?: Maybe<Scalars['String']>;
    imgUrl: Scalars['String'];
};

export type Mutation = {
    __typename?: 'Mutation';
    createVendor: Vendor;
    createKeycapset: Keycapset;
    updateKeycapset: Keycapset;
    deleteKeycapset: Keycapset;
    wantSet: Response;
    toggleHaveSet: Response;
    claimSet: Response;
    createkit: Kit;
    updateKit: Kit;
    googleLogin: GoogleLoginResponse;
    redditLogin: RedditLoginResponse;
    updateUser: User;
    requestDesignerRole: Response;
    requestVendorRole: Response;
    createInterestCheck?: Maybe<InterestCheck>;
    addCommentToInterestCheck?: Maybe<Comment>;
    startInterestCheck?: Maybe<Comment>;
    addAnswerToQuestion?: Maybe<Answer>;
    imgUploadWithUrl: ImgUploadResponse;
    imgUploadFormData: ImgUploadResponse;
    createCollectionForUser?: Maybe<Collection>;
    addWantToCollection?: Maybe<Collection>;
};

export type MutationCreateVendorArgs = {
    name?: Maybe<Scalars['String']>;
    socials?: Maybe<Array<Maybe<Scalars['String']>>>;
    country?: Maybe<Scalars['String']>;
    logoUrl?: Maybe<Scalars['String']>;
    url?: Maybe<Scalars['String']>;
};

export type MutationCreateKeycapsetArgs = {
    name?: Maybe<Scalars['String']>;
    designerName?: Maybe<Scalars['String']>;
    type?: Maybe<Scalars['String']>;
    groupbuyStartDate?: Maybe<Scalars['Date']>;
    groupbuyEndDate?: Maybe<Scalars['Date']>;
    active?: Maybe<Scalars['Boolean']>;
    coverImageUrl?: Maybe<Scalars['String']>;
    imageUrls?: Maybe<Array<Maybe<Scalars['String']>>>;
    websiteUrl?: Maybe<Scalars['String']>;
    brand?: Maybe<Scalars['String']>;
    material?: Maybe<Scalars['String']>;
    accentColor1?: Maybe<Scalars['String']>;
    accentColor2?: Maybe<Scalars['String']>;
    accentColor3?: Maybe<Scalars['String']>;
    vendors?: Maybe<Array<Maybe<Scalars['String']>>>;
    kits?: Maybe<Array<Maybe<KitInput>>>;
    isInterestCheck?: Maybe<Scalars['Boolean']>;
};

export type MutationUpdateKeycapsetArgs = {
    _id: Scalars['String'];
    input: KeycapsetInput;
};

export type MutationDeleteKeycapsetArgs = {
    _id: Scalars['String'];
};

export type MutationWantSetArgs = {
    setId: Scalars['String'];
};

export type MutationToggleHaveSetArgs = {
    setId: Scalars['String'];
    have?: Maybe<Scalars['Boolean']>;
};

export type MutationClaimSetArgs = {
    setId: Scalars['String'];
};

export type MutationCreatekitArgs = {
    name?: Maybe<Scalars['String']>;
    description?: Maybe<Scalars['String']>;
    imgUrl?: Maybe<Scalars['String']>;
    type?: Maybe<Scalars['String']>;
    price?: Maybe<Scalars['Int']>;
};

export type MutationUpdateKitArgs = {
    input?: Maybe<KitInput>;
};

export type MutationGoogleLoginArgs = {
    token: Scalars['String'];
};

export type MutationRedditLoginArgs = {
    redditUserName: Scalars['String'];
    redditId: Scalars['String'];
};

export type MutationUpdateUserArgs = {
    input: UserInput;
};

export type MutationCreateInterestCheckArgs = {
    input?: Maybe<InterestCheckInput>;
};

export type MutationAddCommentToInterestCheckArgs = {
    input?: Maybe<CommentInput>;
};

export type MutationStartInterestCheckArgs = {
    id: Scalars['ID'];
};

export type MutationAddAnswerToQuestionArgs = {
    input?: Maybe<AnswerInput>;
};

export type MutationImgUploadWithUrlArgs = {
    imgUrl: Scalars['String'];
};

export type MutationImgUploadFormDataArgs = {
    file: Scalars['Upload'];
};

export type MutationCreateCollectionForUserArgs = {
    name: Scalars['String'];
};

export type MutationAddWantToCollectionArgs = {
    input: WantToCollection;
};

export type Option = {
    __typename?: 'Option';
    text: Scalars['String'];
    _id?: Maybe<Scalars['String']>;
    kit?: Maybe<Kit>;
};

export type OptionInput = {
    text: Scalars['String'];
};

export type Query = {
    __typename?: 'Query';
    vendor?: Maybe<Vendor>;
    vendorBySlug?: Maybe<Vendor>;
    vendors?: Maybe<Array<Maybe<Vendor>>>;
    keycapsetById: Keycapset;
    keycapsetBySlug: Keycapset;
    keycapsetsByVendor: Array<Maybe<Keycapset>>;
    keycapsets?: Maybe<Array<Keycapset>>;
    allKeycapsetsCount?: Maybe<Scalars['Number']>;
    keycapsetsByQuery?: Maybe<Array<Keycapset>>;
    userWants: Array<Maybe<Want>>;
    userWantsSets: Array<Maybe<Keycapset>>;
    kits?: Maybe<Array<Maybe<Kit>>>;
    me: User;
    users?: Maybe<Array<Maybe<User>>>;
    interestCheckById?: Maybe<InterestCheck>;
    questionById?: Maybe<Question>;
    questionsByICId?: Maybe<Array<Maybe<QuestionAnswer>>>;
    uploads?: Maybe<Array<Maybe<Scalars['String']>>>;
    fetchUserCollections?: Maybe<Array<Maybe<Collection>>>;
};

export type QueryVendorArgs = {
    id: Scalars['ID'];
};

export type QueryVendorBySlugArgs = {
    slug: Scalars['String'];
};

export type QueryKeycapsetByIdArgs = {
    id: Scalars['ID'];
};

export type QueryKeycapsetBySlugArgs = {
    slug: Scalars['String'];
};

export type QueryKeycapsetsByVendorArgs = {
    vendorId: Scalars['ID'];
};

export type QueryKeycapsetsArgs = {
    limit?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    filter?: Maybe<KeycapsetFilter>;
};

export type QueryKeycapsetsByQueryArgs = {
    query?: Maybe<Scalars['String']>;
};

export type QueryUsersArgs = {
    limit?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
};

export type QueryInterestCheckByIdArgs = {
    id: Scalars['ID'];
};

export type QueryQuestionByIdArgs = {
    id: Scalars['ID'];
};

export type QueryQuestionsByIcIdArgs = {
    id: Scalars['ID'];
};

export type Question = {
    __typename?: 'Question';
    _id: Scalars['String'];
    text: Scalars['String'];
    kit?: Maybe<Kit>;
    options?: Maybe<Array<Maybe<Option>>>;
    type: Scalars['String'];
    order?: Maybe<Scalars['Int']>;
};

export type QuestionAnswer = {
    __typename?: 'QuestionAnswer';
    _id: Scalars['String'];
    text: Scalars['String'];
    answers?: Maybe<Array<Maybe<Answer>>>;
};

export type QuestionInput = {
    text: Scalars['String'];
    type: Scalars['String'];
    kit?: Maybe<Scalars['ID']>;
    options?: Maybe<Array<Maybe<OptionInput>>>;
};

export type RedditLoginResponse = {
    __typename?: 'RedditLoginResponse';
    user?: Maybe<User>;
    token: Scalars['String'];
    firstLogin?: Maybe<Scalars['Boolean']>;
};

export type Response = {
    __typename?: 'Response';
    message: Scalars['String'];
    userId?: Maybe<Scalars['ID']>;
};

export type Section = {
    __typename?: 'Section';
    _id: Scalars['ID'];
    type: Scalars['String'];
    title?: Maybe<Scalars['String']>;
    text?: Maybe<Scalars['String']>;
    imgUrl?: Maybe<Scalars['String']>;
};

export type User = {
    __typename?: 'User';
    _id: Scalars['ID'];
    name: Scalars['String'];
    email?: Maybe<Scalars['String']>;
    locked: Scalars['Boolean'];
    geekhackUserName?: Maybe<Scalars['String']>;
    redditUserName?: Maybe<Scalars['String']>;
    avatar?: Maybe<Scalars['String']>;
    locale?: Maybe<Scalars['String']>;
    slug?: Maybe<Scalars['String']>;
    isDesigner?: Maybe<Scalars['Boolean']>;
    isVendor?: Maybe<Scalars['Boolean']>;
};

export type UserInput = {
    _id: Scalars['ID'];
    name?: Maybe<Scalars['String']>;
    email?: Maybe<Scalars['String']>;
    geekhackUserName?: Maybe<Scalars['String']>;
    redditUserName?: Maybe<Scalars['String']>;
};

export type Vendor = {
    __typename?: 'Vendor';
    _id: Scalars['ID'];
    socials?: Maybe<Array<Maybe<Scalars['String']>>>;
    name?: Maybe<Scalars['String']>;
    country?: Maybe<Scalars['String']>;
    logoUrl?: Maybe<Scalars['String']>;
    createdAt?: Maybe<Scalars['Date']>;
    updatedAt?: Maybe<Scalars['Date']>;
    url?: Maybe<Scalars['String']>;
    slug?: Maybe<Scalars['String']>;
};

export type Want = {
    __typename?: 'Want';
    user: Scalars['ID'];
    set: Scalars['ID'];
    have?: Maybe<Scalars['Boolean']>;
    forSale?: Maybe<Scalars['Boolean']>;
    sold?: Maybe<Scalars['Boolean']>;
};

export type WantToCollection = {
    wantId: Scalars['ID'];
    collectionId: Scalars['ID'];
};

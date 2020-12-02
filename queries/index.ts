import { gql } from '@apollo/client';

export const FETCH_KEYCAPSET_QUERY = gql`
    query FETCH_KEYCAPSET_QUERY($limit: Int, $offset: Int, $filter: KeycapsetFilter) {
        allKeycapsetsCount
        keycapsets(limit: $limit, offset: $offset, filter: $filter) {
            _id
            name
            type
            brand
            coverImageUrl
            slug
            groupbuyStartDate
            groupbuyEndDate
            isInterestCheck
            material
            availability
        }
    }
`;

export const CREATE_KEYSET_MUTATION = gql`
    mutation keycapsetCreateOne(
        $name: String
        $type: String
        $active: Boolean
        $coverImageUrl: String
        $vendors: [String]
        $imageUrls: [String]
        $websiteUrl: String
        $brand: String
        $material: String
        $accentColor1: String
        $accentColor2: String
        $accentColor3: String
        $designerName: String
        $groupbuyStartDate: Date
        $groupbuyEndDate: Date
        $kits: [KitInput]
        $isInterestCheck: Boolean
    ) {
        createKeycapset(
            name: $name
            type: $type
            active: $active
            coverImageUrl: $coverImageUrl
            vendors: $vendors
            imageUrls: $imageUrls
            websiteUrl: $websiteUrl
            groupbuyStartDate: $groupbuyStartDate
            groupbuyEndDate: $groupbuyEndDate
            brand: $brand
            material: $material
            accentColor1: $accentColor1
            accentColor2: $accentColor2
            accentColor3: $accentColor3
            kits: $kits
            designerName: $designerName
            isInterestCheck: $isInterestCheck
        ) {
            name
            type
            _id
        }
    }
`;

export const CREATE_VENDOR_MUTATION = gql`
    mutation CREATE_VENDOR_MUTATION(
        $name: String
        $country: String
        $logoUrl: String
        $socials: [String]
        $url: String
    ) {
        createVendor(name: $name, country: $country, logoUrl: $logoUrl, socials: $socials, url: $url) {
            name
            _id
        }
    }
`;

export const GET_VENDORS_QUERY = gql`
    query GET_VENDORS_QUERY {
        vendors {
            name
            _id
            logoUrl
            url
            country
        }
    }
`;

export const GET_SINGLE_SET_QUERY = gql`
    query GET_SINGLE_SET_QUERY($slug: String!) {
        keycapsetBySlug(slug: $slug) {
            _id
            name
            designerName
            type
            coverImageUrl
            groupbuyStartDate
            groupbuyEndDate
            coverImageUrl
            imageUrls
            websiteUrl
            description
            vendors {
                name
                url
                socials
                logoUrl
                country
            }
            kits {
                name
                description
                imgUrl
            }
            slug
            accentColor1
            accentColor2
            accentColor3
            designerName
            brand
            material
            isInterestCheck
            designedBy
            metaUrl
        }
    }
`;

export const GOOGLE_LOGIN = gql`
    mutation GOOGLE_LOGIN($token: String!) {
        googleLogin(token: $token) {
            token
            user {
                _id
                name
                email
                locked
                geekhackUserName
                redditUserName
                avatar
                locale
                slug
                isDesigner
                isVendor
            }
            firstLogin
        }
    }
`;

export const REDDIT_LOGIN = gql`
    mutation REDDIT_LOGIN($redditUserName: String!, $redditId: String!) {
        redditLogin(redditUserName: $redditUserName, redditId: $redditId) {
            token
            firstLogin
        }
    }
`;

export const ME = gql`
    query {
        me {
            _id
            name
            email
            locked
            geekhackUserName
            redditUserName
            avatar
            locale
            slug
            isDesigner
            isVendor
        }
    }
`;

export const TOGGLE_HAVE = gql`
    mutation TOGGLE_HAVE($setId: String!, $have: Boolean) {
        toggleHaveSet(setId: $setId, have: $have) {
            message
        }
    }
`;

export const WANT_SET = gql`
    mutation WANT_SET($setId: String!) {
        wantSet(setId: $setId) {
            message
        }
    }
`;

export const CLAIM_SET = gql`
    mutation CLAIM_SET($setId: String!) {
        claimSet(setId: $setId) {
            message
        }
    }
`;

export const UPDATE_USER = gql`
    mutation UPDATE_USER($input: UserInput!) {
        updateUser(input: $input) {
            name
            email
            geekhackUserName
            redditUserName
        }
    }
`;

// export const USER_WANTS = gql`
//     {
//         userWants {
//             set
//         }
//     }
// `;

export const USER_WANTS_SETS = gql`
    {
        userWantsSets {
            _id
            name
            type
            brand
            coverImageUrl
            slug
            groupbuyStartDate
            groupbuyEndDate
            isInterestCheck
            material
            availability
        }
    }
`;

export const REQUEST_DESIGNER_ROLE = gql`
    mutation REQUEST_DESIGNER_ROLE {
        requestDesignerRole {
            message
        }
    }
`;

export const REQUEST_VENDOR_ROLE = gql`
    mutation REQUEST_VENDOR_ROLE {
        requestVendorRole {
            message
        }
    }
`;

export const IMG_UPLOAD_FORM_DATA = gql`
    mutation IMG_UPLOAD_FORM_DATA($file: Upload!) {
        imgUploadFormData(file: $file) {
            name
            url
            thumb
        }
    }
`;

export const GET_IC_BY_ID = gql`
    query GET_IC_BY_ID($id: ID!) {
        interestCheckById(id: $id) {
            questions {
                text
                _id
            }
            _id
        }
    }
`;

export const GET_QUESTION_BY_ID = gql`
    query GET_QUESTION_BY_ID($id: ID!) {
        questionById(id: $id) {
            text
            _id
            kit {
                name
                imgUrl
                description
            }
        }
    }
`;

export const GET_KEYCAPSET_IC = gql`
    query GET_KEYCAPSET_IC($slug: String!) {
        keycapsetBySlug(slug: $slug) {
            _id
            name
            coverImageUrl
            websiteUrl
            slug
            accentColor1
            accentColor2
            accentColor3
            interestCheck {
                _id
                questions {
                    _id
                    type
                    order
                    text
                    options {
                        text
                        kit {
                            imgUrl
                            name
                            description
                            _id
                        }
                    }
                    kit {
                        name
                        imgUrl
                    }
                }
            }
            metaUrl
        }
    }
`;

export const ADD_ANSWER_TO_QUESTION = gql`
    mutation ADD_ANSWER_TO_QUESTION($input: AnswerInput!) {
        addAnswerToQuestion(input: $input) {
            text
        }
    }
`;

export const ADD_COMMENT_TO_IC = gql`
    mutation ADD_COMMENT_TO_IC($input: CommentInput!) {
        addCommentToInterestCheck(input: $input) {
            text
        }
    }
`;

export const START_IC = gql`
    mutation START_IC($id: ID!) {
        startInterestCheck(id: $id) {
            user
            text
        }
    }
`;

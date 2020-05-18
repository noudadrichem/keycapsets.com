import { gql } from 'apollo-boost';

const FETCH_KEYCAPSET_QUERY = gql`
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

const CREATE_KEYSET_MUTATION = gql`
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

const CREATE_VENDOR_MUTATION = gql`
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

const GET_VENDORS_QUERY = gql`
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

const GET_SINGLE_SET_QUERY = gql`
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
            vendors {
                name
                url
                socials
                logoUrl
            }
            slug
            accentColor1
            accentColor2
            accentColor3
            kits {
                name
                description
                price
                type
            }
            designerName
            brand
            material
            isInterestCheck
            designedBy
        }
    }
`;

const GOOGLE_LOGIN = gql`
    mutation GOOGLE_LOGIN($token: String!) {
        googleLogin(token: $token) {
            token
            user {
                name
                avatar
                locale
            }
            firstLogin
        }
    }
`;

const REDDIT_LOGIN = gql`
    mutation REDDIT_LOGIN($redditUserName: String!, $redditId: String!) {
        redditLogin(redditUserName: $redditUserName, redditId: $redditId) {
            token
            user {
                name
                googleId
                _id
            }
            firstLogin
        }
    }
`;

const ME = gql`
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

const TOGGLE_HAVE = gql`
    mutation TOGGLE_HAVE($setId: String!, $have: Boolean) {
        toggleHaveSet(setId: $setId, have: $have) {
            message
        }
    }
`;

const WANT_SET = gql`
    mutation WANT_SET($setId: String!) {
        wantSet(setId: $setId) {
            message
            setId
        }
    }
`;

const CLAIM_SET = gql`
    mutation CLAIM_SET($setId: String!) {
        claimSet(setId: $setId) {
            message
        }
    }
`;

const UPDATE_USER = gql`
    mutation UPDATE_USER($input: UserInput!) {
        updateUser(input: $input) {
            name
            email
            geekhackUserName
            redditUserName
        }
    }
`;

const USER_WANTS = gql`
    {
        userWants {
            set
        }
    }
`;

export {
    FETCH_KEYCAPSET_QUERY,
    CREATE_KEYSET_MUTATION,
    CREATE_VENDOR_MUTATION,
    GET_VENDORS_QUERY,
    GET_SINGLE_SET_QUERY,
    GOOGLE_LOGIN,
    REDDIT_LOGIN,
    ME,
    TOGGLE_HAVE,
    WANT_SET,
    CLAIM_SET,
    UPDATE_USER,
    USER_WANTS,
};

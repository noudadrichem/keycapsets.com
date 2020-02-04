import { gql } from "apollo-boost";

const FETCH_KEYCAPSET_QUERY = gql`query FETCH_KEYCAPSET_QUERY {
  keycapsets {
     _id
    name
    type
    coverImageUrl
    slug
    groupbuyStartDate
    groupbuyEndDate
  }
}`;

const CREATE_KEYSET_MUTATION = gql`mutation keycapsetCreateOne(
    $name: String
    $type: String
    $active: Boolean
    $coverImageUrl: String
    $vendors: [String]
    $imageUrls: [String]
    $websiteUrl: String
    $groupbuyStartDate: Date
    $groupbuyEndDate: Date
) {
    createKeycapset(
        name: $name
        type: $type
        active: $active
        coverImageUrl: $coverImageUrl,
        vendors: $vendors
        imageUrls: $imageUrls
        websiteUrl: $websiteUrl
        groupbuyStartDate: $groupbuyStartDate
        groupbuyEndDate: $groupbuyEndDate
    ) {
        name
        type
        _id
    }
}`

const CREATE_VENDOR_MUTATION = gql`mutation CREATE_VENDOR_MUTATION(
  $name: String,
  $country: String,
  $logoUrl: String,
  $socials: [String],
  $url: String
) {
    createVendor(
      name: $name,
      country: $country,
      logoUrl: $logoUrl,
      socials: $socials,
      url: $url
    ) {
        name
        _id
    }
}`

const GET_VENDORS_QUERY = gql`query GET_VENDORS_QUERY {
  vendors {
    name
    _id
    logoUrl
  }
}
`

export {
    FETCH_KEYCAPSET_QUERY,
    CREATE_KEYSET_MUTATION,
    CREATE_VENDOR_MUTATION,
    GET_VENDORS_QUERY
}

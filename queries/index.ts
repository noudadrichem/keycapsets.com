import { gql } from "apollo-boost";

const FETCH_KEYCAPSET_QUERY = gql`
query FETCH_KEYCAPSET_QUERY {
  keycapsets {
     _id
    name
    type
    coverImageUrl
    slug
  }
}`;

export { FETCH_KEYCAPSET_QUERY }

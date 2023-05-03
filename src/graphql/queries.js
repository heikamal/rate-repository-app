import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
		edges {
			node {
				fullName
				description
				forksCount
				ownerAvatarUrl
				ratingAverage
				reviewCount
				stargazersCount
				language
		  	}
		}
	}
  }
`;

export const ME = gql`
	query Query {
		me {
			id
			username
		}
	}
`;
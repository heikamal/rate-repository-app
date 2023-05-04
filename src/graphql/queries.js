import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
		edges {
			node {
				id
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

export const GET_SINGLE_REPOSITORY = gql`
	query ($repositoryId: ID!) {
		repository(id: $repositoryId) {
			id
			fullName
			description
			forksCount
			ownerAvatarUrl
			ratingAverage
			reviewCount
			stargazersCount
			language
			url
		}
	}
`;
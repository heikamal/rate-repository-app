import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query Query($orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy, $searchKeyword: String, $first: Int, $after: String) {
    repositories(orderDirection: $orderDirection, orderBy: $orderBy, searchKeyword: $searchKeyword, first: $first, after: $after) {
		totalCount
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
			cursor
		}
		pageInfo {
			endCursor
			startCursor
			hasNextPage
		}
	}
  }
`;

export const GET_CURRENT_USER = gql`
	query Query($includeReviews: Boolean = false) {
		me {
			username
			reviews @include(if: $includeReviews) {
			  edges {
				node {
				  text
				  rating
				  createdAt
				  id
				  repository {
					id
					fullName
				  }
				}
			  }
			}
		  }
	}
`;

export const GET_SINGLE_REPOSITORY = gql`
	query($repositoryId: ID!, $first: Int, $after: String)  {
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
			reviews (first: $first, after: $after){
				totalCount
				edges {
					node {
						id
						text
						rating
						createdAt
						user {
							id
							username
						}
					}
					cursor
				}
				pageInfo {
					endCursor
					startCursor
					hasNextPage
				}
			}
		}
	}
`;
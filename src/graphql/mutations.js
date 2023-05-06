import { gql } from '@apollo/client';

export const AUTHENTICATE = gql`
	mutation Mutation($credentials: AuthenticateInput) {
		authenticate(credentials: $credentials) {
	  		accessToken
		}
	}
`;

export const CREATE_REVIEW = gql`
	mutation Mutation($review: CreateReviewInput) {
		createReview(review: $review) {
			user {
				username
				id
			}
			rating
			createdAt
			text
		}
	}
`;

export const CREATE_USER = gql`
	mutation Mutation($user: CreateUserInput) {
		createUser(user: $user) {
			username
			id
			createdAt
		}
	}
`;

export const DELETE_REVIEW = gql`
	mutation Mutation($deleteReviewId: ID!) {
		deleteReview(id: $deleteReviewId)
	}
`;
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
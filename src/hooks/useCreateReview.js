import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";

const useCreateReview = () => {
	const [mutate, result] = useMutation(CREATE_REVIEW, {
		onError: (error) => {
			console.log("ERROR:", error);
		}
	});

	const createReview = async ({ username, reponame, rating, review }) => {
		const { data } = await mutate({variables: { review: { ownerName: username, repositoryName: reponame, rating: parseInt(rating), text: review }}});
		return { data };
	};

	return [createReview, result];
};

export default useCreateReview;
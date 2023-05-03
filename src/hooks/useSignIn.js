import { useMutation } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";

const useSignIn = () => {
	const [mutate, result] = useMutation(AUTHENTICATE, {
		onError: (error) => {
			console.log("ERROR:", error);
		}
	});

	const signIn = async ({ username, password }) => {
		return mutate({variables: { credentials: { username: username, password: password }}});
	};

	return [signIn, result];
};

export default useSignIn;
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../graphql/queries";
import { useEffect, useState } from "react";

const useGetCurrentUser = () => {

	const getCurrentUser = useQuery(GET_CURRENT_USER, {
		variables: {
			includeReviews: true
		},
	});

	const [user, setUser] = useState();
	const [loading, setLoading] = useState(false);

	const fetchUser = () => {
		setLoading(getCurrentUser.loading);
		const response = getCurrentUser.loading ? undefined : getCurrentUser.data.me;
		setLoading(getCurrentUser.loading);
		setUser(response);
	}

	console.log('Terve Hookista!')

	useEffect(() => {
		console.log('tämä on useEffect')
		fetchUser();
	});

	return { user, loading, refetch: fetchUser };
};

export default useGetCurrentUser;
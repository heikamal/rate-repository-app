import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";
import { useEffect, useState } from "react";

const useRepositories = ({ orderBy, orderDir, search }) => {
	const allRepositories = useQuery(GET_REPOSITORIES, {
		fetchPolicy: 'cache-and-network',
		variables: {
			orderDirection: orderDir,
			orderBy: orderBy,
			searchKeyword: search
		},
	})

	const [repositories, setRepositories] = useState();
	const [loading, setLoading] = useState(false);
	

	const fetchRepositories = () => {
		setLoading(allRepositories.loading);
		console.log(orderBy, orderDir, search)
		const response = allRepositories.loading ? undefined : allRepositories.data.repositories
		setLoading(allRepositories.loading);
		setRepositories(response);
	};

	useEffect(() => {
		fetchRepositories();
	});

  return { repositories, loading, refetch: fetchRepositories};
};

export default useRepositories;
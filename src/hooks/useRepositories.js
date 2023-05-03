import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
	const response = useQuery(GET_REPOSITORIES, {
		fetchPolicy: 'cache-and-network',
	})

	const repositories = response.loading ? undefined : response.data.repositories
	const loading = response.loading;

  return { repositories, loading };
};

export default useRepositories;
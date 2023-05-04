import { useQuery } from "@apollo/client";
import { GET_SINGLE_REPOSITORY } from "../graphql/queries";

const useRepository = (id) => {
	const response = useQuery(GET_SINGLE_REPOSITORY, {
		variables: { repositoryId: id },
		fetchPolicy: 'cache-and-network',
	})

	const repository = response.loading ? undefined : response.data.repository
	const loading = response.loading;

  return { repository, loading };
};

export default useRepository;
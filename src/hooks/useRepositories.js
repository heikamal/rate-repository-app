import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = ({ orderBy, orderDir, search }) => {
	const { data, loading, fetchMore, refetch, ...result } = useQuery(GET_REPOSITORIES, {
		fetchPolicy: 'cache-and-network',
		variables: {
			first: 2,
			orderDirection: orderDir,
			orderBy: orderBy,
			searchKeyword: search
		},
	})

	const handleFetchMore = () => {
		const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;
		if (!canFetchMore) {
			return;
		}

		fetchMore({
			variables: {
				first: 2,
				after: data.repositories.pageInfo.endCursor,
				orderDirection: orderDir,
				orderBy: orderBy,
				searchKeyword: search,
			},
		});
	};

  return { repositories: data?.repositories,
	fetchMore: handleFetchMore,
	loading,
	refetch,
	...result
	};
};

export default useRepositories;
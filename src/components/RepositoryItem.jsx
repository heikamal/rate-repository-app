import { Text, View } from "react-native";

const RepositoryItem = ({ item }) => {
	return (
		<View>
			<Text>
			Full name: {item.fullName}{'\n'}
			Description: {item.description}{'\n'}
			Language: {item.language}{'\n'}
			Stars: {item.stargazersCount}{'\n'}
			Forks: {item.forksCount}{'\n'}
			Reviews: {item.reviewCount}{'\n'}
			Rating: {item.ratingAverage}{'\n'}
			</Text>
		</View>
	);
};

export default RepositoryItem;
import { View, StyleSheet, Image, Pressable, FlatList } from "react-native";
import Text from "../Text";
import theme from "../../theme";
import useRepository from "../../hooks/useRepository";
import { useNavigate, useParams } from "react-router-native";
import * as Linking from 'expo-linking';
import { format, parseISO } from "date-fns";


const style = StyleSheet.create({
	card: {
		backgroundColor: theme.colors.repoItemBackground,
		padding: 10,
		flexDirection: 'column'
	},
	imgInforContainer: {
		flexDirection: 'row',
		marginBottom: 10,
	},
	imgContainer: {
		maxWidth: 60,
		maxHeight: 60,
	},
	img: {
		width: 50,
		height: 50,
		borderRadius: 5,
		marginRight: 10,
	},
	infoContainer: {
		display: "flex",
		flexDirection: 'column',
		alignItems: 'flex-start',
		flexShrink: 1,
		padding: 5,
	},
	nameContainer: {
		flexGrow: 0,
		marginBottom: 5,
	},
	name: {
		fontSize: theme.fontSizes.subheading,
		fontWeight: 'bold',
	},
	descContainer: {
		marginBottom: 5,
	},
	langTagContainer: {
		flex: 1,
		backgroundColor: theme.colors.primary,
		alignItems: 'center', 
		justifyContent: 'center',
		padding: 3,
		borderRadius: 4,
	},
	langTag: {
		fontSize: theme.fontSizes.body,
		color: theme.colors.appBarText, 
	},
	statsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
	},
	statItem: {
		flexDirection: 'column',
		alignItems: 'center',
	},
	button: {
		backgroundColor: theme.colors.primary,
		alignItems: 'center', 
		justifyContent: 'center',
		padding: 10,
		margin: 5,
		borderRadius: 4,
	},
	buttonText: {
		fontSize: theme.fontSizes.body,
		color: theme.colors.appBarText,
		fontWeight: 'bold',
	},
	ratingContainer: {
		height: 50,
		width: 50,
		borderRadius: 50 / 2,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 2,
		borderColor: theme.colors.primary,
	},
	ratingText: {
		color: theme.colors.primary,
		fontSize: theme.fontSizes.subheading,
		fontWeight: 'bold',
	},
	separator: {
		height: 10,
	},
});

const ItemSeparator = () => <View style={style.separator} />;

export const RepositoryItem = ({ item, singleView }) => {

	const stars = item.stargazersCount > 1000 
	? `${Math.round((item.stargazersCount / 1000) * 10) / 10}k` 
	: item.stargazersCount; 
	
	const forks = item.forksCount > 1000 
	? `${Math.round((item.forksCount / 1000) * 10) / 10}k` 
	: item.forksCount; 

	return (
		<View testID="repositoryItem" style={style.card}>
			<View style={style.imgInforContainer}>
				<View style={style.imgContainer} >
					<Image 
						style={style.img}
						source={{uri: item.ownerAvatarUrl}}
					/>
				</View>
				<View style={style.infoContainer}>
					<View style={style.nameContainer}>
						<Text style={style.name}>{item.fullName}</Text>
					</View>
					<View style={style.descContainer}>
						<Text>{item.description}</Text>
					</View>
					<View style={style.langTagContainer}>
						<Text style={style.langTag}>{item.language}</Text>
					</View>
				</View>
			</View>
			<View style={style.statsContainer}>
				<View style={style.statItem}>
					<Text style={style.name}>{stars}</Text>
					<Text>Stars</Text>
				</View>
				<View style={style.statItem}>
					<Text style={style.name}>{forks}</Text>
					<Text>Forks</Text>
				</View>
				<View style={style.statItem}>
					<Text style={style.name}>{item.reviewCount}</Text>
					<Text>Reviews</Text>
				</View>
				<View style={style.statItem}>
					<Text style={style.name}>{item.ratingAverage}</Text>
					<Text>Rating</Text>
				</View>
			</View>
			{singleView && (
				<Pressable onPress={() => Linking.openURL(item.url)}>
					<View style={style.button}>
						<Text style={style.buttonText}>Open in Github</Text>
					</View>
				</Pressable>
			)}
		</View>
	);
};

const RepositoryItemContainer = ({ item, singleView }) => {

	const navigate = useNavigate();
	let onEndReach = () => {};

	if (singleView) {
		let { id } = useParams();
		const { repository, fetchMore } = useRepository(id);
		item = repository;
		onEndReach = () => {
			fetchMore();
		};
	}
	
	if (!item) {
		return (<Text>Loading...</Text>)
	}

	if (singleView) {
		const reviewNodes = item.reviews
		? item.reviews.edges.map((edge) => edge.node)
		: [];
		
		return (
			<FlatList
			data={reviewNodes}
			renderItem={({ item }) => <ReviewItem review={item} />}
			onEndReached={onEndReach}
			ItemSeparatorComponent={ItemSeparator}
			keyExtractor={({ id }) => id}
			ListHeaderComponent={(<View><RepositoryItem item={item} singleView={singleView} /><ItemSeparator/></View>)}
			/>
		);
	}

	const onPress = (event) => {
		event.preventDefault();
		navigate(`/${item.id}`);
	}

	return (
		<Pressable onPress={onPress}>
			<RepositoryItem item={item} singleView={singleView} />
		</Pressable>
	);
};

const ReviewItem = ({ review }) => {

	if (!review) {
		return <View></View>;
	}

	const date = format(parseISO(review.createdAt), "dd'.'MM'.'yyyy")
	return (
		<View style={style.card}>
			<View style={style.imgInforContainer}>
				<View style={style.ratingContainer} >
					<Text style={style.ratingText}>{review.rating}</Text>
				</View>
				<View style={style.infoContainer}>
					<View style={style.nameContainer}>
						<Text style={style.name}>{review.user.username}</Text>
					</View>
					<View style={style.descContainer}>
						<Text style={style.description}>{date}</Text>
					</View>
				</View>
			</View>
			<Text>{review.text}</Text>
		</View>
	);
};

export default RepositoryItemContainer;
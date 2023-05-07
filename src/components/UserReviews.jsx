import { Alert, FlatList, Pressable, StyleSheet, View } from "react-native";
import Text from "./Text";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../graphql/queries";
import { format, parseISO } from "date-fns";
import theme from "../theme";
import { Link } from "react-router-native";
import { DELETE_REVIEW } from "../graphql/mutations";

const styles = StyleSheet.create({
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
		flex: 1,
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
	buttonsContainer: {
		flexDirection: 'row',
		flex: 1,
	},
	deleteButton: {
		backgroundColor: theme.colors.error,
		alignItems: 'center', 
		justifyContent: 'center',
		padding: 10,
		margin: 5,
		borderRadius: 4,
		flex: 1,
	}
});


const ItemSeparator = () => <View style={styles.separator} />;

const UserReviews = () => {
	const { loading, data, refetch } = useQuery(GET_CURRENT_USER, {
		fetchPolicy: 'cache-and-network',
		variables: {
			includeReviews: true
		},
	});

	const [onDeleteHandler] = useMutation(DELETE_REVIEW, {
		onError: (error) => {
			console.log("ERROR:", error);
		},
	}) 

	const deleteReview = (id) => {
		onDeleteHandler({ variables: { deleteReviewId: id } })
		refetch();
	};


	if (loading) {
		return null;
	}

	console.log(data.me);

	const reviewNodes = data.me.reviews
		? data.me.reviews.edges.map((edge) => edge.node)
		: [];
	console.log(reviewNodes);
	return(
		<FlatList
			data={reviewNodes}
			renderItem={({ item }) => <ReviewItem review={item} onDelPress={deleteReview}/>}
			ItemSeparatorComponent={ItemSeparator}
			keyExtractor={({ id }) => id}
			/>
	);
};

const ReviewItem = ({ review, onDelPress }) => {
	console.log(review)

	if (!review.repository.fullName) {
		return <View></View>;
	}

	const deleteRevi = (event) => {
		event.preventDefault();
		Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
			{
				text: 'Cancel',
				onPress: () => console.log('Cancel Pressed'),
				style: 'cancel',
			},
			{text: 'Delete', onPress: () => onDelPress(review.id)},
		]);
	}
	

	const date = format(parseISO(review.createdAt), "dd'.'MM'.'yyyy")
	return (
		<View style={styles.card}>
			<View style={styles.imgInforContainer}>
				<View style={styles.ratingContainer} >
					<Text style={styles.ratingText}>{review.rating}</Text>
				</View>
				<View style={styles.infoContainer}>
					<View style={styles.nameContainer}>
						<Text style={styles.name}>{review.repository.fullName}</Text>
					</View>
					<View style={styles.descContainer}>
						<Text style={styles.description}>{date}</Text>
					</View>
				</View>
			</View>
			<Text>{review.text}</Text>
			<View style={styles.buttonsContainer}>
				<Link to={`/${review.repository.id}`}>
					<View style={styles.button}>
							<Text style={styles.buttonText}>View repository</Text>
					</View>
				</Link>
				<Pressable onPress={deleteRevi}>
					<View style={styles.deleteButton}>
						<Text style={styles.buttonText}>Delete review</Text>
					</View>
				</Pressable>
			</View>
		</View>
	);
};

export default UserReviews;
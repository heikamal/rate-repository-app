import { View, StyleSheet, Image } from "react-native";
import Text from "../Text";
import theme from "../../theme";

const RepositoryItem = ({ item }) => {

	const stars = item.stargazersCount > 1000 
	? `${Math.round((item.stargazersCount / 1000) * 10) / 10}k` 
	: item.stargazersCount; 
	
	const forks = item.forksCount > 1000 
	? `${Math.round((item.forksCount / 1000) * 10) / 10}k` 
	: item.forksCount; 

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
		}
	});

	return (
		<View style={style.card}>
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
		</View>
	);
};

export default RepositoryItem;
import { StyleSheet, Text, View } from "react-native";
import theme from "../../theme";
import { Link } from "react-router-native";

const AppBarTab = ({ viewStyle, text, route }) => {

	const styles = StyleSheet.create({
		text: {
			fontSize: theme.fontSizes.subheading,
			paddingVertical: 20,
			paddingHorizontal: 10,
			fontWeight: "bold",
			color: theme.colors.appBarText
		},
	});

	return (
		<View style={viewStyle}>
			<Link to={route}>
				<Text style={styles.text}>{text}</Text>
			</Link>
		</View>
	);
};

export default AppBarTab;
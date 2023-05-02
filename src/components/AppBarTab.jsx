import { Pressable, StyleSheet, Text, View } from "react-native";
import theme from "../theme";

const AppBarTab = ({ viewStyle, text, onPress }) => {

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
			<Pressable onPress={onPress}>
				<Text style={styles.text}>{text}</Text>
			</Pressable>
		</View>
	);
};

export default AppBarTab;
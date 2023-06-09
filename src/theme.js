import { Platform } from "react-native";

const theme = {
	colors: {
		textPrimary: '#24292e',
		textSecondary: '#586069',
		primary: '#0366d6',
		appBar: '#24292e',
		appBarText: '#f8f8ff',
		mainBackground: '#e1e4e8',
		repoItemBackground: '#f8f8ff',
		textBoxBorder: '#696969',
		textBoxText: '#808080',
		error: '#ff0000',
		textBoxBackground: '#ffffff',
	},
	fontSizes: {
		body: 14,
		subheading: 16,
	},
	fonts: {
		main: Platform.select({
			android: 'Roboto',
			ios: 'Arial',
			default: 'Sans-serif',
		}),
	},
	fontWeights: {
		normal: '400',
		bold: '700',
	},
};
  
export default theme;
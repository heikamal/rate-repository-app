import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
	normal: {
		borderColor: theme.colors.textBoxBorder,
	},
	error: {
		borderColor: theme.colors.error
	}
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style];

  return <NativeTextInput style={[textInputStyle, error ? styles.error : styles.normal]} {...props} />;
};

export default TextInput;
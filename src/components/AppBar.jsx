import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
	display: 'flex',
  },
  flexItemA: {
    flexGrow: 0,
  },
});

const onPressHandler = (event) => {
	event.preventDefault();
	console.log('Tabia painettu!')
}

const AppBar = () => {
  return <View style={styles.container}>
	<AppBarTab viewStyle={styles.flexItemA} text={'Repositories'} onPress={onPressHandler} />
  </View>;
};

export default AppBar;
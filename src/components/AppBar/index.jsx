import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import theme from '../../theme';
import AppBarTab from './AppBarTab';
import { ScrollView } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
	flexDirection: 'row',
  },
  flexItemA: {
    flexGrow: 0,
  },
});

const AppBar = () => {
  return (
	<View style={styles.container}>
		<ScrollView horizontal>
			<AppBarTab viewStyle={styles.flexItemA} text={'Repositories'} route={'/'} />
			<AppBarTab viewStyle={styles.flexItemA} text={'Sign In'}  route={'/signin'}/>
		</ScrollView>
	</View>
  ); 
};

export default AppBar;
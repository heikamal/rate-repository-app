import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import theme from '../theme';
import { Navigate, Route, Routes } from 'react-router-native';
import SignIn from './SignIn';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
	backgroundColor: theme.colors.mainBackground,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
	<AppBar />
	<Routes>
		<Route path='/' element={<RepositoryList />} exact />
		<Route path='*' element={<Navigate to='/' replace />} />
		<Route path='/signin' element={<SignIn />} exact/>
	</Routes>
    </View>
  );
};

export default Main;
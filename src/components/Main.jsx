import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList/index';
import AppBar from './AppBar/index';
import theme from '../theme';
import { Navigate, Route, Routes } from 'react-router-native';
import SignIn from './SignIn';
import RepositoryItemContainer from './RepositoryList/RepositoryItem';
import Review from './Review';
import SignUp from './SignUp';
import UserReviews from './UserReviews';

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
    <Route path='/:id' element={<RepositoryItemContainer item={null} singleView={true}/>} exact/>
    <Route path='/createreview' element={<Review />} exact/>
    <Route path='/signup' element={<SignUp />} exact/>
    <Route path='/reviews' element={<UserReviews />} exact />
	</Routes>
    </View>
  );
};

export default Main;
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../../theme';
import AppBarTab from './AppBarTab';
import { useApolloClient, useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../../graphql/queries';
import { useAuthStorage } from '../../hooks/useAuthStorage';
import Text from '../Text';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
    flexDirection: 'row',
  },
  flexItemA: {
    flexGrow: 0,
  },
  textSignOut: {
    fontSize: theme.fontSizes.subheading,
    paddingVertical: 20,
    paddingHorizontal: 10,
    fontWeight: "bold",
    color: theme.colors.appBarText
  }
});

const AppBar = () => {
  const { loading, data } = useQuery(GET_CURRENT_USER, {
		fetchPolicy: 'cache-and-network',
	});
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
    
   
  if (loading) {
      return null;
  }

  const signOut = async (event) => {
    event.preventDefault();
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    console.log('Logged out!')
  };

  return (
	<View style={styles.container}>
		<ScrollView horizontal>
			<AppBarTab viewStyle={styles.flexItemA} text={'Repositories'} route={'/'} />
      {data.me && <AppBarTab viewStyle={styles.flexItemA} text={'Create a review'} route={'/createreview'} />}
      {data.me && <AppBarTab viewStyle={styles.flexItemA} text={'My reviews'} route={'/reviews'} />}
			{data.me !== null
      ? <Pressable onPress={signOut}><View style={styles.flexItemA}><Text style={styles.textSignOut}>Sign Out</Text></View></Pressable>
      : <AppBarTab viewStyle={styles.flexItemA} text={'Sign In'}  route={'/signin'}/>}
      {!data.me && <AppBarTab viewStyle={styles.flexItemA} text={'Sign up'} route={'/signup'}/>}
		</ScrollView>
	</View>
  ); 
};

export default AppBar;
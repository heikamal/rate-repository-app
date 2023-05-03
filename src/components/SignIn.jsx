import { Pressable, View, StyleSheet } from 'react-native';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import { Formik } from 'formik';

const initialValues = {
  username: '',
  password: '',
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.repoItemBackground,
		padding: 10,
		flexDirection: 'column',
    flexShrink: 1,
  },
  button: {
    backgroundColor: theme.colors.primary,
    alignItems: 'center', 
    justifyContent: 'center',
    padding: 10,
    margin: 5,
    borderRadius: 4,
  },
  formTextField: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: theme.colors.textBoxBorder,
    borderRadius: 5,
    color: theme.colors.textBoxText,
  },
  buttonText: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.appBarText,
    fontWeight: 'bold',
  }
});

const SignIn = ({ onSubmit }) => {

  return (
    <View style={styles.container}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
    </View>
  );
};

const SignInForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput name="username" placeholder="Username" style={styles.formTextField} />
      <FormikTextInput secureTextEntry name="password" placeholder="Password" style={styles.formTextField} />
      <Pressable style={styles.button} onPress={onSubmit} >
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  );
}

export default SignIn;
import { Pressable, View, StyleSheet } from 'react-native';
import Text from './Text';
import FormikTextInput from './FormikTextInput/index';
import theme from '../theme';
import { Formik } from 'formik';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

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
    borderRadius: 5,
    color: theme.colors.textBoxText,
  },
  buttonText: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.appBarText,
    fontWeight: 'bold',
  }
});

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log(data);
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <SignInForm onSubmit={onSubmit} />
    </View>
  );
};

export const SignInForm = ({ onSubmit }) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
    {({ handleSubmit }) =>(
    <View>
        <FormikTextInput name="username" placeholder="Username" style={styles.formTextField} />
        <FormikTextInput secureTextEntry name="password" placeholder="Password" style={styles.formTextField} />
        <Pressable style={styles.button} onPress={handleSubmit} >
          <Text style={styles.buttonText}>Sign in</Text>
        </Pressable>
    </View>
    )}
    </Formik>
  );
}

export default SignIn;
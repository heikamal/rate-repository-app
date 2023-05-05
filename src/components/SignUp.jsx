import { Pressable, View, StyleSheet } from 'react-native';
import Text from './Text';
import FormikTextInput from './FormikTextInput/index';
import theme from '../theme';
import { Formik } from 'formik';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';
import useSignUp from '../hooks/useSignUp';

const validationSchema = yup.object().shape({
	username: yup.string().required('Username is required')
		.min(1, 'Username must have at least one character, I have no idea how you did this.')
		.max(30, 'Username cannot be longer than 30 characters'),
	password: yup.string().required('Password is required')
		.min(5, 'Password must be at least 5 characters long')
		.max(50, 'Password cannot be longer than 50 characters'),
	passwordConf: yup.string().oneOf([yup.ref('password'), null]).required('Password confirmation is required'),
});

const initialValues = {
  username: '',
  password: '',
  passwordConf: '',
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

const SignUp = () => {
	const [signUp] = useSignUp();
	const [signIn] = useSignIn();
	const navigate = useNavigate();

	const onSubmit = async (values) => {
		const { username, password } = values;

		try {
			const signUpData = await signUp({ username, password })
			const signInData = await signIn({ username, password });
			console.log(signInData.data, signUpData.data);
			navigate('/');
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<View style={styles.container}>
			<SignUpForm onSubmit={onSubmit} />
		</View>
	);
};

export const SignUpForm = ({ onSubmit }) => {
	return (
	<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
		{({ handleSubmit }) =>(
		<View>
			<FormikTextInput name="username" placeholder="Username" style={styles.formTextField} />
			<FormikTextInput secureTextEntry name="password" placeholder="Password" style={styles.formTextField} />
			<FormikTextInput secureTextEntry name="passwordConf" placeholder="Password confirmation" style={styles.formTextField} />
			<Pressable style={styles.button} onPress={handleSubmit} >
				<Text style={styles.buttonText}>Sign up</Text>
			</Pressable>
		</View>
		)}
	</Formik>
	);
  };

export default SignUp;
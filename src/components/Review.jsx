import { Pressable, View, StyleSheet } from 'react-native';
import Text from './Text';
import FormikTextInput from './FormikTextInput/index';
import theme from '../theme';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import useCreateReview from '../hooks/useCreateReview';

const validationSchema = yup.object().shape({
  username: yup.string().required('Repository owner name is required'),
  reponame: yup.string().required('Repository name is required'),
  rating: yup.number().min(0).max(100).required('Rating between 0 and 100 required'),
  review: yup.string().default(""),
});

const initialValues = {
  username: '',
  reponame: '',
  rating: '',
  review: '',
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

const Review = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    console.log(values);
    const { username, reponame, rating, review } = values;
    try {
      const { data } = await createReview({ username, reponame, rating, review });
      console.log(data);
      navigate('/');
    } catch (e) {
      console.log(e);
    }
    
  };

  return (
    <View style={styles.container}>
      <ReviewForm onSubmit={onSubmit} />
    </View>
  );
};

export const ReviewForm = ({ onSubmit }) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
    {({ handleSubmit }) =>(
    <View>
        <FormikTextInput name="username" placeholder="Repository owner name" style={styles.formTextField} />
        <FormikTextInput name="reponame" placeholder="Repository name" style={styles.formTextField} />
        <FormikTextInput name="rating" placeholder="Rating between 0 and 100" style={styles.formTextField} />
        <FormikTextInput name="review" placeholder="Review" style={styles.formTextField} />
        <Pressable style={styles.button} onPress={handleSubmit} >
          <Text style={styles.buttonText}>Create a review</Text>
        </Pressable>
    </View>
    )}
    </Formik>
  );
};

export default Review;
import styles from '../../styles/BoardForm.module.scss';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { Textarea } from './Textarea';
import slugify from 'slugify';
import { useCreateBoardMutation } from '../../generated/graphql';
import router from 'next/router';
import { Inputfield } from './Inputfield';

interface Props {}
interface Values {
  title: string;
  slug: string;
  description: string;
  adjustable: boolean;
  angles: string;
  location: string;
}

export const BoardForm = ({}: Props) => {
  const [createBoard] = useCreateBoardMutation();
  return (
    <Formik
      initialValues={{
        title: '',
        slug: '',
        description: '',
        adjustable: false,
        angles: '',
        location: ''
      }}
      validationSchema={Yup.object({
        title: Yup.string()
          .min(2, 'Must be 2 characters or more')
          .max(16, 'Must be shorter than 20 characters')
          .required('Required'),
        description: Yup.string()
          .min(2, 'Must be 2 characters or more')
          .max(80, 'Must be shorter than 80 characters')
          .required('Required'),
        adjustable: Yup.bool().required('Required'),
        angles: Yup.string()
        .trim()
          .min(1, 'Must select at least one angle')
          .matches(/^(\d+)(,\s*\d+)*$/, "Please enter a comma separated list of angles.")
          .required('Required')
      })}
      onSubmit={async (values: Values) => {
        const { errors } = await createBoard({
          variables: {
            options: {
              ...values,
              slug: slugify(values.title),
              angles: values.angles.split(', ').map(Number),
              adjustable: values.angles.length > 2
            }
          },
          update: (cache) => {
            cache.evict({ fieldName: 'getBoards' });
          }
        });

        if (errors) {
          console.log(errors);
        }
        if (!errors) {
          router.push('/boards');
        }
      }}
    >
      {({ dirty, isValid }) => (
        <div className={styles.boardForm}>
          <Form>
            <h1>Create Board</h1>

            <Inputfield
              name='title'
              type='text'
              label='Title'
              placeholder='Board title'
            />
            <Inputfield
              name='location'
              type='text'
              label='Location'
              placeholder='Country, City (optional)'
            />
            <Inputfield
              name='angles'
              type='text'
              label='Angles (as comma separated list if several angles)'
              placeholder='10, 20, 30, 40'
            />
            <Textarea
              name='description'
              label='Description'
              placeholder='Brief description of your board'
            />

            <input
              type='submit'
              className='btn'
              value='Save Board'
              disabled={!dirty || !isValid}
            />
          </Form>
        </div>
      )}
    </Formik>
  );
};

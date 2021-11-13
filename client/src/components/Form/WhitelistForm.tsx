import styles from '../../styles/AscentForm.module.scss';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useWhitelistUserMutation } from '../../generated/graphql';
import { toast } from 'react-toastify';
import { Inputfield } from './Inputfield';
import { toErrorMap } from '../../utils/toErrorMap';

interface Props {
  boardId: string;
  onClose: () => void;
}
interface Values {
  email: string;
  boardId: string;
}

export const WhitelistForm = ({ boardId, onClose }: Props) => {
  const [whitelistUser] = useWhitelistUserMutation();

  return (
    <Formik
      initialValues={{ email: '', boardId }}
      validationSchema={Yup.object({
        email: Yup.string().email().required('Required'),
      })}
      onSubmit={async (values: Values, { setErrors }) => {
        const response = await whitelistUser({
          variables: { options: values },
          update: (cache) => {
            cache.evict({ fieldName: 'getWhitelist' });
          },
        });

        if (response.data?.whitelistUser.errors) {
          setErrors(toErrorMap(response.data.whitelistUser.errors));
        } else if (response.data?.whitelistUser.userId) {
          toast.success(`User whitelisted 🎉`);
          onClose();
        }
      }}
    >
      {({ dirty, values }) => (
        <div className={styles.form}>
          <Form>
            <Inputfield
              placeholder="User's email"
              label='Whitelist User'
              type='email'
              name='email'
            />
            <input
              type='submit'
              className='btn'
              value='Add user'
              disabled={values.email.length === 0 || !dirty}
            />
          </Form>
        </div>
      )}
    </Formik>
  );
};

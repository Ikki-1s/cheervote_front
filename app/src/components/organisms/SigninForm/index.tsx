import { useState } from 'react';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { css } from '@emotion/react';
import { signin, SigninParams } from 'domains';
import { setClientSideCookie } from 'utils';
import ColorButton from 'components/atoms/ColorButton';
import FormLabel from 'components/atoms/FormLabel';
import FormSubmitErrorMessage from 'components/atoms/FormSubmitErrorMessage';
import FormInputErrorMessage from 'components/atoms/FormInputErrorMessage';
import Input from 'components/atoms/Input';

const styles = {
  wrap: css`
    width: 100%;
    max-width: 410px;
  `,
  form: css`
    display: flex;
    flex-direction: column;
  `,
  formItemWrap: css`
    margin-top: 14px;
  `,
  formItem: css`
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,
  formBody: css`
    display: flex;
    flex-direction: column;
    gap: 4px;
  `,
};

type Inputs = SigninParams;

const SigninForm = () => {
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);

  const {
    register, // 入力または選択された要素を登録し検証
    handleSubmit, // 検証が成功するとフォーム内のデータを受け取る
    formState: { errors }, // バリデーションエラーを受け取る
    // reset,
  } = useForm<Inputs>({
    criteriaMode: 'firstError',
    shouldFocusError: true,
    mode: 'onBlur',
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await signin(data);

      if (res.status === 200) {
        setClientSideCookie(res);
        // router.push('/');
        router.back();
      } else {
        console.log(res);
        setAlertMessageOpen(true);
      }
    } catch (err) {
      console.log(err);
      setAlertMessageOpen(true);
    }
  };

  return (
    <div css={styles.wrap}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate css={styles.form}>
        {alertMessageOpen && (
          <FormSubmitErrorMessage>
            メールアドレスかパスワードが間違っています
          </FormSubmitErrorMessage>
        )}
        <div css={styles.formItemWrap}>
          <div css={styles.formItem}>
            <FormLabel htmlFor='email'>メールアドレス</FormLabel>
            <div css={styles.formBody}>
              <Input
                id='email'
                type='email'
                register={register('email', {
                  required: 'メールアドレスを入力してください',
                  maxLength: { value: 254, message: '254文字以内で入力してください' },
                  pattern: {
                    value: /^[a-zA-Z0-9.!#$ %&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: 'メールアドレスの形式が正しくありません',
                  },
                })}
              />
              {errors.email && errors.email.message && (
                <FormInputErrorMessage title={errors.email.message} />
              )}
            </div>
          </div>
        </div>
        <div css={styles.formItemWrap}>
          <div css={styles.formItem}>
            <FormLabel htmlFor='password'>パスワード</FormLabel>
            <div css={styles.formBody}>
              <Input
                id='password'
                type='password'
                register={register('password', { required: 'パスワードを入力してください' })}
              />
              {errors.password && errors.password.message && (
                <FormInputErrorMessage title={errors.password.message} />
              )}
            </div>
          </div>
        </div>
        <ColorButton type='submit' color='blue' height={48} fontWeight='medium' marginTop={36}>
          ログイン
        </ColorButton>
      </form>
    </div>
  );
};

export default SigninForm;

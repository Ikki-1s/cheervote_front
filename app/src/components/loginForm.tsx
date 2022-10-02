import { useState } from 'react';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';

import { SignInParams } from 'types';
import { signIn } from 'libs/auth';
import { setClientSideCookie } from 'libs/cookie';

type Inputs = SignInParams;

export const LoginForm = () => {
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);

  const {
    register, // 入力または選択された要素を登録し検証
    handleSubmit, // 検証が成功するとフォーム内のデータを受け取る
    formState: { errors }, // バリデーションエラーを受け取る
    // reset,
  } = useForm<Inputs>({
    criteriaMode: 'firstError',
    shouldFocusError: true,
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await signIn(data);

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
    <div className='flex justify-center items-center'>
      <div className='w-max inline-flex shadow p-8 bg-gray-50 justify-center text-right'>
        <form onSubmit={handleSubmit(onSubmit)}>
          {alertMessageOpen && (
            <div
              className='text-center mb-3 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'
              role='alert'
            >
              <span className='block sm:inline'>ユーザ名かパスワードが間違っています</span>
              {/* <strong className='font-bold'>ユーザ名かパスワードが間違っています</strong> */}
            </div>
          )}
          <div className='mb-3'>
            <label className='text-right font-bold w-full text-gray-800' htmlFor='email'>
              メールアドレス
              <input
                id='email'
                type='text'
                // name='email'
                // placeholder='メールアドレス'
                className='text-base w-72 border border-solid border-gray-800 rounded-md ml-4'
                {...register('email', {
                  required: true,
                  maxLength: 254,
                  pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  // value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  // message: 'メールアドレスの形式が不正です',
                })}
              />
              {errors.email && (
                <div className='text-red-500 flex-1'>メールアドレスの形式が不正です</div>
              )}
            </label>
          </div>
          <div className='mb-3'>
            <label className='text-right font-bold w-full text-gray-800' htmlFor='password'>
              パスワード
              <input
                id='password'
                type='password'
                // placeholder='パスワード'
                // name='password'
                className='text-base w-72 border border-solid border-gray-800 rounded-md ml-4'
                {...register('password', {
                  required: true,
                })}
              />
              {errors.password && (
                <div className='text-red-500 flex-1'>パスワードの形式が不正です</div>
              )}
            </label>
          </div>
          <button
            type='submit'
            // className='bg-blue-500 border-none py-1 px-4 rounded min-w-min text-base text-white font-bold'
            className='bg-blue-500 hover:bg-blue-300 text-white rounded-lg px-4 py-2 m-2'
          >
            ログイン
          </button>
        </form>
      </div>
    </div>
  );
};

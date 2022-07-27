import { useState } from 'react';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';

import { SignUpParams } from 'types';
import { signUp } from 'libs/auth';
import { setClientSideCookie } from 'libs/cookie';

type Inputs = SignUpParams;

export const SignUpForm = () => {
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
      const res = await signUp(data);

      if (res.status === 200) {
        // アカウント作成と同時にログインさせてしまう
        // 本来であればメール確認などを挟むべき

        setClientSideCookie(res);
        router.push('/');
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
      <div className='w-max inline-flex shadow p-8 bg-gray-50 text-right justify-center'>
        <form onSubmit={handleSubmit(onSubmit)}>
          {alertMessageOpen && (
            <div
              className='text-center mb-3 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'
              role='alert'
            >
              <span className='block sm:inline'>ユーザー登録に失敗しました。</span>
              {/* <strong className='font-bold'>ユーザー登録に失敗しました</strong> */}
            </div>
          )}
          <div className='mb-3'>
            <label className='text-right font-bold w-full text-gray-800' htmlFor='name'>
              ユーザー名
              <input
                id='name'
                type='text'
                className='text-base w-72 border border-solid border-gray-800 rounded-md ml-4'
                {...register('name', {
                  required: true,
                  maxLength: 30,
                })}
              />
              {errors.name && <div className='text-red-500 flex-1'>ユーザー名の形式が不正です</div>}
            </label>
          </div>
          <div className='mb-3'>
            <label className='text-right font-bold w-full text-gray-800' htmlFor='email'>
              メールアドレス
              <input
                id='email'
                type='text'
                className='text-base w-72 border border-solid border-gray-800 rounded-md ml-4'
                {...register('email', {
                  required: true,
                  maxLength: 254,
                  pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
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
          <div className='mb-3'>
            <label
              className='text-right font-bold w-full text-gray-800'
              htmlFor='password_confirmation'
            >
              パスワード（確認用）
              <input
                id='password_confirmation'
                type='password'
                className='text-base w-72 border border-solid border-gray-800 rounded-md ml-4'
                {...register('password_confirmation', {
                  required: true,
                })}
              />
              {errors.password_confirmation && (
                <div className='text-red-500 flex-1'>パスワード（確認用）の形式が不正です</div>
              )}
            </label>
          </div>
          <div className='mb-3'>
            <label className='text-right font-bold w-full text-gray-800' htmlFor='prefecture_id'>
              都道府県
              <input
                id='prefecture_id'
                type='text'
                className='text-base w-72 border border-solid border-gray-800 rounded-md ml-4'
                {...register('prefecture_id', {
                  required: true,
                  maxLength: 2,
                })}
              />
              {errors.prefecture_id && (
                <div className='text-red-500 flex-1'>都道府県の形式が不正です</div>
              )}
            </label>
          </div>
          <div className='mb-3'>
            <label
              className='text-right font-bold w-full text-gray-800'
              htmlFor='hr_constituency_id'
            >
              衆議院小選挙区
              <input
                id='hr_constituency_id'
                type='text'
                className='text-base w-72 border border-solid border-gray-800 rounded-md ml-4'
                {...register('hr_constituency_id', {
                  required: true,
                  maxLength: 3,
                })}
              />
              {errors.hr_constituency_id && (
                <div className='text-red-500 flex-1'>衆議院小選挙区の形式が不正です</div>
              )}
            </label>
          </div>
          <div className='mb-3'>
            <label
              className='text-right font-bold w-full text-gray-800'
              htmlFor='hc_constituency_id'
            >
              参議院選挙区
              <input
                id='hc_constituency_id'
                type='text'
                className='text-base w-72 border border-solid border-gray-800 rounded-md ml-4'
                {...register('hc_constituency_id', {
                  required: true,
                  maxLength: 3,
                })}
              />
              {errors.hc_constituency_id && (
                <div className='text-red-500 flex-1'>参議院選挙区の形式が不正です</div>
              )}
            </label>
          </div>
          <button
            type='submit'
            // className='bg-blue-500 border-none py-1 px-4 rounded min-w-min text-base text-white font-bold'
            className='bg-blue-500 hover:bg-blue-300 text-white rounded-lg px-4 py-2 m-2'
          >
            登録する
          </button>
        </form>
      </div>
    </div>
  );
};

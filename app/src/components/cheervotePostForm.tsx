import { postCheervoteEvaluation } from 'libs/cheervotes';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CheervoteEvaluationParams } from 'types';
import { useContext, useState } from 'react';
import { CheervotePostDataContext } from './providers/CheervoteDataProvider';

type Inputs = CheervoteEvaluationParams;

export const CheervotePostForm = () => {
  const {
    register, // 入力または選択された要素を登録し検証
    handleSubmit, // 検証が成功するとフォーム内のデータを受け取る
    formState: { errors }, // バリデーションエラーを受け取る
    // reset,
  } = useForm<Inputs>({
    criteriaMode: 'firstError',
    shouldFocusError: true,
  });

  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);

  const { cheervotePostData, setCheervotePostData, cheervoteComplete, setCheervoteComplete } =
    useContext(CheervotePostDataContext);

  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    cheervotePostData.cv_evaluation_id = Number(data.evaluation);
    setCheervotePostData(cheervotePostData);
    // console.log(cheervotePostData);

    try {
      const res = await postCheervoteEvaluation(cheervotePostData);

      if (res.status === 201) {
        // console.log('成功');
        // console.log(res.data);
        setCheervoteComplete(true);
      } else {
        console.log('登録失敗');
        setAlertMessageOpen(true);
      }
    } catch (err) {
      console.log('エラーキャッチ');
      // console.log(err);
      // console.log(err!.message);
      // console.log(err!.response.data.data.message);
      setAlertMessageOpen(true);
    }
  };

  return (
    <div className='flex justify-center items-center'>
      {/* <div className='w-max inline-flex shadow p-8 bg-gray-50 text-right justify-center'> */}
      <div className='w-max inline-flex p-8 text-right justify-center'>
        <form onSubmit={handleSubmit(onSubmit)}>
          {alertMessageOpen && (
            <div
              className='text-center mb-3 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'
              role='alert'
            >
              <span className='block sm:inline'>
                エラーが発生しました。リロード（更新）してください
              </span>
            </div>
          )}
          <label>
            <input
              {...register('evaluation', { required: true })}
              type='radio'
              id='1'
              value='1'
              className={`
                  opacity-0 absolute peer
              `}
            />
            <span
              className={`
                inline-block relative m-[0_2em_0_0] p-[0.3em_0.3em_0.3em_2em]
                leading-none align-middle cursor-pointer
                before:content-[""] before:absolute
                before:top-[0.25em] before:left-0
                before:w-[1.375em] before:h-[1.375em]
                before:border before:border-solid before:border-gray-500
                before:rounded-[50%] before:leading-none before:bg-white
                after:content-[""] after:hidden
                peer-checked:after:block peer-checked:after:absolute
                peer-checked:after:top-[0.45em] peer-checked:after:left-[0.2em]
                peer-checked:after:w-[1em] peer-checked:after:h-[1em] peer-checked:after:m-0 peer-checked:after:p-0
                peer-checked:after:rounded-[50%] peer-checked:after:bg-[#3D98B4] peer-checked:after:leading-none
           `}
            >
              大変良い
            </span>
          </label>
          <label>
            <input
              {...register('evaluation', { required: true })}
              type='radio'
              id='2'
              value='2'
              className={`
                  opacity-0 absolute peer
              `}
            />
            <span
              className={`
                inline-block relative m-[0_2em_0_0] p-[0.3em_0.3em_0.3em_2em]
                leading-none align-middle cursor-pointer
                before:content-[""] before:absolute
                before:top-[0.25em] before:left-0
                before:w-[1.375em] before:h-[1.375em]
                before:border before:border-solid before:border-gray-500
                before:rounded-[50%] before:leading-none before:bg-white
                after:content-[""] after:hidden
                peer-checked:after:block peer-checked:after:absolute
                peer-checked:after:top-[0.45em] peer-checked:after:left-[0.2em]
                peer-checked:after:w-[1em] peer-checked:after:h-[1em] peer-checked:after:m-0 peer-checked:after:p-0
                peer-checked:after:rounded-[50%] peer-checked:after:bg-[#3D98B4] peer-checked:after:leading-none
           `}
            >
              良い
            </span>
          </label>
          <label>
            <input
              {...register('evaluation', { required: true })}
              type='radio'
              id='3'
              value='3'
              className={`
                  opacity-0 absolute peer
              `}
            />
            <span
              className={`
                inline-block relative m-[0_2em_0_0] p-[0.3em_0.3em_0.3em_2em]
                leading-none align-middle cursor-pointer
                before:content-[""] before:absolute
                before:top-[0.25em] before:left-0
                before:w-[1.375em] before:h-[1.375em]
                before:border before:border-solid before:border-gray-500
                before:rounded-[50%] before:leading-none before:bg-white
                after:content-[""] after:hidden
                peer-checked:after:block peer-checked:after:absolute
                peer-checked:after:top-[0.45em] peer-checked:after:left-[0.2em]
                peer-checked:after:w-[1em] peer-checked:after:h-[1em] peer-checked:after:m-0 peer-checked:after:p-0
                peer-checked:after:rounded-[50%] peer-checked:after:bg-[#3D98B4] peer-checked:after:leading-none
           `}
            >
              普通
            </span>
          </label>
          <label>
            <input
              {...register('evaluation', { required: true })}
              type='radio'
              id='4'
              value='4'
              className={`
                  opacity-0 absolute peer
              `}
            />
            <span
              className={`
                inline-block relative m-[0_2em_0_0] p-[0.3em_0.3em_0.3em_2em]
                leading-none align-middle cursor-pointer
                before:content-[""] before:absolute
                before:top-[0.25em] before:left-0
                before:w-[1.375em] before:h-[1.375em]
                before:border before:border-solid before:border-gray-500
                before:rounded-[50%] before:leading-none before:bg-white
                after:content-[""] after:hidden
                peer-checked:after:block peer-checked:after:absolute
                peer-checked:after:top-[0.45em] peer-checked:after:left-[0.2em]
                peer-checked:after:w-[1em] peer-checked:after:h-[1em] peer-checked:after:m-0 peer-checked:after:p-0
                peer-checked:after:rounded-[50%] peer-checked:after:bg-[#3D98B4] peer-checked:after:leading-none
           `}
            >
              悪い
            </span>
          </label>
          <label>
            <input
              {...register('evaluation', { required: true })}
              type='radio'
              id='5'
              value='5'
              className={`
                  opacity-0 absolute peer
              `}
            />
            <span
              className={`
                inline-block relative m-[0_2em_0_0] p-[0.3em_0.3em_0.3em_2em]
                leading-none align-middle cursor-pointer
                before:content-[""] before:absolute
                before:top-[0.25em] before:left-0
                before:w-[1.375em] before:h-[1.375em]
                before:border before:border-solid before:border-gray-500
                before:rounded-[50%] before:leading-none before:bg-white
                after:content-[""] after:hidden
                peer-checked:after:block peer-checked:after:absolute
                peer-checked:after:top-[0.45em] peer-checked:after:left-[0.2em]
                peer-checked:after:w-[1em] peer-checked:after:h-[1em] peer-checked:after:m-0 peer-checked:after:p-0
                peer-checked:after:rounded-[50%] peer-checked:after:bg-[#3D98B4] peer-checked:after:leading-none
           `}
            >
              大変悪い
            </span>
          </label>
          <div>
            <button
              type='submit'
              // className='bg-blue-500 border-none py-1 px-4 rounded min-w-min text-base text-white font-bold'
              className='bg-blue-500 hover:bg-blue-300 text-white rounded-lg px-4 py-2 m-6'
            >
              投票する
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

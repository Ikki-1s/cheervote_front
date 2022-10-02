import { useContext } from 'react';
import { CheervoteForm } from './cheervoteForm';
import { CheervotePostDataContext } from './providers/CheervoteDataProvider';

// 暫定対応。今後複数設問扱えるよう対応する
export const CheervoteQuestion = () => {
  const { cheervoteComplete } = useContext(CheervotePostDataContext);

  return cheervoteComplete ? (
    <>
      <p className='flex justify-center m-2 text-3xl text-red-500 font-bold tracking-wider leading-tight'>
        投票が完了しました！！
      </p>
    </>
  ) : (
    <>
      <p className='flex justify-center m-2 text-xl font-semibold tracking-wider leading-tight'>
        議員の直近1ヶ月の活動（初めて投票される方はこれまでの活動）
        <br />
        に対するあなたの評価を選択してください。
      </p>
      <CheervoteForm />
    </>
  );
};

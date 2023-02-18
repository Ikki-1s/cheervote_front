import useSWR from 'swr';
import useSWRImmutable from 'swr/immutable';
import { css } from '@emotion/react';
import {
  valueof,
  getResultForPieChart,
  getActiveCvTermsOfPolitician,
  getCvQuestionAndValues,
} from 'domains';
import Organism from 'components/organisms/PoliticianCvResult';

const styles = {
  loading: css`
    height: 500px;
  `,
};

type Props = { politicianId: string };

const PoliticianCvResult = ({ politicianId }: Props) => {
  // 指定した政治家の現役の期間分の支持投票期間のデータ取得
  const { data: activeCvTerms } = useSWRImmutable(
    ['/cheervotes/terms/active', { politicianId: politicianId }],
    (args) => getActiveCvTermsOfPolitician(args[1]),
  );

  // 評価投票設問（＋評価値）の取得
  const { data: cvQuestion } = useSWRImmutable(['/cv_questions', '1'], (args) =>
    getCvQuestionAndValues(args[1]),
  );

  // 評価投票結果の円グラフ表示用データ取得
  const { data: cvResult, mutate } = useSWR(
    [
      '/cheervotes/results/pie',
      politicianId,
      { politicianId: politicianId, cvQuestionId: 1, myConstituencyFlg: 1 },
    ],
    (args) => getResultForPieChart(args[2]),
    {
      // revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  // セレクトボックスの値変更時に実行するonChangeイベント
  // 評価投票結果の円グラフ表示用データの再取得
  const onChangeDisplayCvTerm = async (cvTermId: string) => {
    try {
      const res = await getResultForPieChart({
        politicianId: politicianId,
        cvQuestionId: 1,
        myConstituencyFlg: 1,
        cvTermId: Number(cvTermId),
      });
      mutate(
        {
          ...cvResult,
          labels: res.labels,
          which_house: res.which_house,
          data: res.data,
          total: res.total,
        },
        false,
      );
    } catch (err) {
      console.log(err);
    }
  };

  // セレクトボックス用にデータ加工
  const cvTerms: valueof<Pick<Parameters<typeof Organism>[0], 'cvTerms'>> | undefined =
    activeCvTerms && {
      option: activeCvTerms.map((term) => {
        // 取得した支持投票期間の投票開始年月日時・投票終了年月日時を表示用に加工
        const tmpStartDate = new Date(term.start_date);
        let tmpEndDate = new Date(term.end_date);

        const currentDate = new Date();
        let isInTermOfCv = '';

        // 投票受付中の期間なら受付中の文言を頭に付ける
        if (tmpStartDate <= currentDate && currentDate < tmpEndDate) {
          isInTermOfCv = '【受付中】';
        }

        // 投票開始年月日日時
        const convertStartDate = isInTermOfCv + tmpStartDate.toLocaleDateString('ja-JP');

        // 投票終了年月日時
        tmpEndDate.setDate(tmpEndDate.getDate() - 1);
        const convertEndDate = tmpEndDate.toLocaleDateString('ja-JP');

        return {
          key: term.id,
          value: term.id,
          label: `${convertStartDate} 〜 ${convertEndDate}`,
        };
      }),
      onChangeAction: onChangeDisplayCvTerm,
    };

  if (!cvTerms || !cvQuestion || !cvResult) {
    return <div css={styles.loading}></div>;
  }

  return (
    <Organism
      politicianId={politicianId}
      cvTerms={cvTerms}
      cvQuestion={cvQuestion.cv_question}
      cvResult={cvResult}
    />
  );
};

export default PoliticianCvResult;

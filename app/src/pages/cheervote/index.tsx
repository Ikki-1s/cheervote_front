import { NextPage, GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

import Layout from 'components/layout';
import { getCheervotePageData } from 'libs/cheervotes';
import { getCvQuestionData } from 'libs/cvQuestions';

import { CheervotePageData, CheervotePostData, CvEvaluationValue, CvQuestion } from 'types';
import { CheervotePostDataContext } from 'components/providers/CheervoteDataProvider';
import { useState } from 'react';
import { CheervoteQuestion } from 'components/cheervoteQuestion';

const Cheervote: NextPage<Props> = (props: Props) => {
  const { cheervotePageData, cvQuestionData } = props;
  // console.log(cookie);

  const initialCheervotePostData = {
    which_house: cheervotePageData.is_active_house_member
      ? cheervotePageData.hc_member
        ? 'hc'
        : cheervotePageData.hr_member
        ? 'hr'
        : null
      : null,
    politician_id: cheervotePageData.is_active_house_member
      ? cheervotePageData.hc_member
        ? cheervotePageData.hc_member.politician.id
        : cheervotePageData.hr_member
        ? cheervotePageData.hr_member.politician.id
        : null
      : null,
    member_id: cheervotePageData.is_active_house_member
      ? cheervotePageData.hc_member
        ? cheervotePageData.hc_member.id
        : cheervotePageData.hr_member
        ? cheervotePageData.hr_member.id
        : null
      : null,
    cv_term_id: cheervotePageData.current_cv_term ? cheervotePageData.current_cv_term.id : null,
    // 暫定
    cv_question_id: 1,
    cv_evaluation_id: null,
  };

  const [cheervotePostData, setCheervotePostData] =
    useState<CheervotePostData>(initialCheervotePostData);
  // console.log(cheervotePostData);
  const [cheervoteComplete, setCheervoteComplete] = useState<boolean>(false);

  return (
    <Layout>
      <h1 className='flex justify-center m-2 text-6xl font-semibold tracking-wider leading-tight'>
        CHEERVOTE（支持投票）
      </h1>
      {/* 現役参議院議員の場合 */}
      {cheervotePageData.is_active_house_member === true && cheervotePageData.hc_member && (
        <>
          <h2 className='flex justify-center m-2 text-5xl font-semibold tracking-wider leading-tight'>
            {`${cheervotePageData.hc_member.politician.last_name_kanji} ${cheervotePageData.hc_member.politician.first_name_kanji} 参議院議員`}
          </h2>
          <h3 className='flex justify-center m-2 text-4xl font-semibold tracking-wider leading-tight'>
            {/* 選挙区選出の場合 */}
            {cheervotePageData.hc_member.elected_system === 1 &&
              `${cheervotePageData.hc_member.hc_constituency?.name.replace(
                /(都|府|県)/,
                '',
              )}選挙区 選出`}
            {/* 全国比例選出の場合 */}
            {cheervotePageData.hc_member.elected_system === 2 && '全国比例 選出'}
          </h3>
        </>
      )}
      {/* 現役衆議院議員の場合 */}
      {cheervotePageData.is_active_house_member === true && cheervotePageData.hr_member && (
        <>
          <h2 className='flex justify-center m-2 text-5xl font-semibold tracking-wider leading-tight'>
            {`${cheervotePageData.hr_member.politician.last_name_kanji} ${cheervotePageData.hr_member.politician.first_name_kanji}  衆議院議員`}
          </h2>
          <h3 className='flex justify-center m-2 text-4xl font-semibold tracking-wider leading-tight'>
            {/* 小選挙区選出の場合 */}
            {cheervotePageData.hr_member.elected_system === 1 &&
              `${cheervotePageData.hr_member.hr_constituency?.prefecture.prefecture.replace(
                /(都|府|県)/,
                '',
              )}${cheervotePageData.hr_member.hr_constituency?.name} 選出`}
            {/* 比例代表選出の場合 */}
            {cheervotePageData.hr_member.elected_system === 2 &&
              `比例 ${cheervotePageData.hr_member.hr_pr_block?.block_name}ブロック 選出`}
          </h3>
          <p className='flex justify-center'>
            {cheervotePageData.hr_member.elected_system === 2 &&
              cheervotePageData.hr_member.hr_constituency &&
              `（小選挙区：${cheervotePageData.hr_member.hr_constituency?.prefecture.prefecture.replace(
                /(都|府|県)/,
                '',
              )}${cheervotePageData.hr_member.hr_constituency?.name} 重複立候補者）`}
          </p>
        </>
      )}
      {/* マイ選挙区表示 */}
      {cheervotePageData.is_login === true &&
        cheervotePageData.is_my_constituency_member === true && (
          <h3 className='flex justify-center text-3xl font-semibold text-blue-500 rounded-lg px-4 py-2 m-2'>
            マイ選挙区
          </h3>
        )}
      {/* 支持投票受付期間 */}
      {cheervotePageData.current_cv_term && (
        <p className='flex justify-center'>
          <b>
            {`投票受付期間： ${cheervotePageData.current_cv_term.start_date} 〜 ${cheervotePageData.current_cv_term.end_date}`}
          </b>
        </p>
      )}
      {/* 支持投票評価選択 */}
      {cheervotePageData.is_active_house_member ? (
        cheervotePageData.current_cv_term ? (
          cheervotePageData.is_login ? (
            cheervotePageData.is_my_constituency_member ? (
              cheervotePageData.is_login_user_possible_to_cv_on_term ? (
                <CheervotePostDataContext.Provider
                  value={{
                    cheervotePostData,
                    setCheervotePostData,
                    cheervoteComplete,
                    setCheervoteComplete,
                  }}
                >
                  <CheervoteQuestion />
                </CheervotePostDataContext.Provider>
              ) : (
                <p className='flex justify-center m-2 text-xl font-semibold tracking-wider leading-tight'>
                  現在のCHEERVOTE（支持投票）受付期間にすでに投票済みです。
                  <br />
                  次回の受付期間の投票もよろしくお願いいたします。
                </p>
              )
            ) : (
              <p className='flex justify-center m-2 text-xl font-semibold tracking-wider leading-tight'>
                マイ選挙区の議員でないため、この議員に
                <br />
                CHEERVOTE（支持投票）することはできません。
              </p>
            )
          ) : (
            <p className='flex justify-center m-2 text-xl font-semibold tracking-wider leading-tight'>
              マイ選挙区の議員である場合、ログインすると
              <br />
              CHEERVOTE（支持投票）することができます。
            </p>
          )
        ) : (
          <p className='flex justify-center m-2 text-xl font-semibold tracking-wider leading-tight'>
            CHEERVOTE（支持投票）の受付期間外です。
          </p>
        )
      ) : (
        <p className='flex justify-center m-2 text-xl font-semibold tracking-wider leading-tight'>
          {/* 対象の議員はいません。 */}
          指定の政治家がいないか、現役議員ではないため、
          <br />
          CHEERVOTE（支持投票）することができません。
        </p>
      )}
    </Layout>
  );
};

export default Cheervote;

// type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
type Props = {
  cheervotePageData: CheervotePageData;
  cvQuestionData: {
    cv_question: CvQuestion;
    cv_evaluation_values: CvEvaluationValue[];
  };
};

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const { politician } = context.query;
  const cookie = parseCookies(context);

  const cheervotePageData = await getCheervotePageData(politician as string, cookie);
  const cvQuestionData = await getCvQuestionData('1');

  // 取得した支持投票期間の投票開始年月日時・投票終了年月日時を表示用に加工
  if (cheervotePageData.current_cv_term) {
    const convert_start_date = new Date(
      cheervotePageData.current_cv_term.start_date,
    ).toLocaleDateString('ja-JP');
    // .replace(/(\d+)\/(\d+)\/(\d+)/g, '$3/$1/$2');

    let tmp_end_date = new Date(cheervotePageData.current_cv_term.end_date);
    tmp_end_date.setDate(tmp_end_date.getDate() - 1);
    const convert_end_date = tmp_end_date.toLocaleDateString('ja-JP');
    // .replace(/(\d+)\/(\d+)\/(\d+)/g, '$3/$1/$2');

    cheervotePageData.current_cv_term.start_date = convert_start_date;
    cheervotePageData.current_cv_term.end_date = convert_end_date;
  }

  return {
    props: {
      cheervotePageData,
      cvQuestionData,
    },
  };
};

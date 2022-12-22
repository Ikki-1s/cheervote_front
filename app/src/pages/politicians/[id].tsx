import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';
// import { ParsedUrlQuery } from 'querystring';

import { SubmitHandler, useForm } from 'react-hook-form';

import { CvTerm, PoliticianWithAssociateData, ResultForPieChart } from 'types';
import { getPoliticianWithAssociateData } from 'libs/politicians';
import { getActiveCvTermsOfPolitician, getResultForPieChart } from 'libs/cheervotes';
import Layout from 'components/layout';
import { CheervoteResultPieChart } from 'components/charts/cheervoteResult';
import { PieChart } from 'components/atoms/Chart';

type Inputs = { displayCvTerm: string };

const Politicians: NextPage<Props> = ({
  politicianWithAssociateData,
  resultForPieChart,
  activeCvTermsOfPolitician,
}) => {
  const [cvResult, setCvResult] = useState<ResultForPieChart>(resultForPieChart);
  const { register } = useForm<Inputs>();

  const onChangeDisplayCvTerm = async (cvTermId: number) => {
    try {
      const res = await getResultForPieChart({
        politicianId: politicianWithAssociateData[0].id.toString(),
        cvQuestionId: 1,
        myConstituencyFlg: 1,
        cvTermId: cvTermId,
      });
      setCvResult(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <h1 className='flex justify-center m-2 text-6xl font-semibold tracking-wider leading-tight'>
        {`${politicianWithAssociateData[0].last_name_kanji} ${politicianWithAssociateData[0].first_name_kanji}`}
      </h1>
      <Link href={`/cheervote?politician=${politicianWithAssociateData[0].id}`}>
        <a className='flex justify-center text-indigo-600 hover:text-indigo-600 hover:underline'>
          CHEERVOTE（支持投票ページ）はこちら
        </a>
      </Link>
      {activeCvTermsOfPolitician.length && (
        <div className='flex justify-center'>
          {/* <form onSubmit={handleSubmit(onSubmit)}> */}
          <form>
            <label>表示する投票期間：</label>
            <div className='relative block'>
              <select
                className={`
                  appearance-none block w-full p-[10px_30px_8px_10px]
                  rounded-[4px] border border-solid border-gray-300
                `}
                {...register('displayCvTerm', {
                  onChange: (e) => onChangeDisplayCvTerm(e.target.value as number),
                })}
              >
                {activeCvTermsOfPolitician.map(({ id, start_date, end_date }) => (
                  <option key={id} value={id.toString()}>
                    {start_date} 〜 {end_date}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </div>
      )}
      {cvResult.total > 0 ? (
        <>
          <PieChart labels={cvResult.labels} data={cvResult.data} />
          <CheervoteResultPieChart labels={cvResult.labels} data={cvResult.data} />
        </>
      ) : (
        <div className='flex justify-center m-20 text-xl font-medium tracking-wider leading-tight'>
          この期間の投票はありません
        </div>
      )}
    </Layout>
  );
};

export default Politicians;

type Props = {
  politicianWithAssociateData: PoliticianWithAssociateData[];
  resultForPieChart: ResultForPieChart;
  activeCvTermsOfPolitician: CvTerm[];
};

type PathParams = {
  id: string;
};

// interface Params extends ParsedUrlQuery {
//   id: string;
// }

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const { id } = context.params as PathParams;

  const politicianWithAssociateData = await getPoliticianWithAssociateData(id);
  const activeCvTermsOfPolitician = await getActiveCvTermsOfPolitician({
    politicianId: id,
  });
  const resultForPieChart = await getResultForPieChart({
    politicianId: id,
    cvQuestionId: 1,
    myConstituencyFlg: 1,
  });

  // 取得した支持投票期間の投票開始年月日時・投票終了年月日時を表示用に加工
  // activeCvTermsOfPolitician.map((term, index) => {
  activeCvTermsOfPolitician.map((term) => {
    const tmpStartDate = new Date(term.start_date);
    let tmpEndDate = new Date(term.end_date);

    const currentDate = new Date();
    let isInTermOfCv = '';

    // 投票受付中の期間なら受付中の文言を頭に付ける
    // if (index === 0 && tmpStartDate <= currentDate && currentDate <= tmpEndDate) {
    if (tmpStartDate <= currentDate && currentDate < tmpEndDate) {
      isInTermOfCv = '【受付中】';
    }

    // 投票開始年月日時
    const convertStartDate = tmpStartDate.toLocaleDateString('ja-JP');
    term.start_date = isInTermOfCv + convertStartDate;

    // 投票終了年月日時
    tmpEndDate.setDate(tmpEndDate.getDate() - 1);
    const convertEndDate = tmpEndDate.toLocaleDateString('ja-JP');
    term.end_date = convertEndDate;
  });

  return {
    props: {
      politicianWithAssociateData,
      resultForPieChart,
      activeCvTermsOfPolitician,
    },
  };
};

// export const getStaticPaths: GetStaticPaths<Params> = async () => {
//   const paths = await getAllPoliticiansIds();
//   return {
//     paths,
//     fallback: false,
//   };
// };

// export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
//   const politicianWithAssociateData = await getPoliticianWithAssociateData(params!.id);
//   const resultForPieChart = await getResultForPieChart({
//     politicianId: params!.id,
//     cvQuestionId: 1,
//     myConstituencyFlg: 1,
//   });
//   const activeCvTermsOfPolitician = await getActiveCvTermsOfPolitician({
//     politicianId: params!.id,
//   });

//   // 取得した支持投票期間の投票開始年月日時・投票終了年月日時を表示用に加工
//   activeCvTermsOfPolitician.map((term) => {
//     // 投票開始年月日時
//     const convert_start_date = new Date(term.start_date).toLocaleDateString('ja-JP');
//     term.start_date = convert_start_date;

//     // 投票終了年月日時
//     let tmp_end_date = new Date(term.end_date);
//     tmp_end_date.setDate(tmp_end_date.getDate() - 1);
//     const convert_end_date = tmp_end_date.toLocaleDateString('ja-JP');
//     term.end_date = convert_end_date;
//   });

//   return {
//     props: {
//       politicianWithAssociateData,
//       resultForPieChart,
//       activeCvTermsOfPolitician,
//     },
//   };
// };

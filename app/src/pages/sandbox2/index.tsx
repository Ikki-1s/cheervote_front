import CvPoliticianBasicInfo from 'components/organisms/CvPoliticianBasicInfo';
import Cheervote from 'components/templates/cheervote/Cheervote';
import Layout from 'components/templates/common/Layout';
import { valueof } from 'domains';
import { NextPage } from 'next';

const Home: NextPage = () => {
  const cvPoliticianBasicInfoData: Parameters<typeof CvPoliticianBasicInfo>[0] = {
    politician: {
      lastNameKanji: '逢沢',
      firstNameKanji: '一郎',
      image: '',
    },
    politicalParty: {
      nameKanji: '自由民主党',
    },
    activeElectionData: {
      whichHouse: 'hr',
      electedArea: '岡山１区',
      dualCandidacyArea: '和歌山１２区',
    },
  };

  const cvMyConstituencyMemberBadge: valueof<
    Pick<Parameters<typeof Cheervote>[0], 'cvMyConstituencyMemberBadge'>
  > = {
    style: 'isMember',
  };

  const activeCvTerm = {
    id: 6,
    start_date: '2023-01-01T00:00:00.000+09:00',
    end_date: '2023-02-01T00:00:00.000+09:00',
    created_at: '2022-08-26T22:50:03.641+09:00',
    updated_at: '2022-08-26T22:50:03.641+09:00',
  };

  const cvPostForm = {
    cvPageData: {
      is_login: true,
      is_active_house_member: true,
      hr_member: {
        id: 1,
        politician_id: 1,
        hr_election_time_id: 49,
        elected_system: 1,
        hr_constituency_id: 228,
        hr_pr_block_id: null,
        mid_term_start_date: null,
        mid_term_start_reason: '',
        mid_term_end_date: null,
        mid_term_end_reason: '',
        hr_election_time: {
          id: 49,
          election_time: 49,
          announcement_date: '2021-10-19',
          election_date: '2021-10-31',
          expiration_date: null,
          dissolution_date: null,
        },
        hr_constituency: {
          id: 228,
          name: '１区',
          prefecture_id: 33,
          prefecture: {
            id: 33,
            prefecture: '岡山県',
          },
        },
        politician: {
          id: 1,
          last_name_kanji: '逢沢',
          first_name_kanji: '一郎',
          last_name_kana: 'あいさわ',
          first_name_kana: 'いちろう',
          career: null,
          website: null,
          twitter: null,
          youtube: null,
          facebook: null,
          other_sns: null,
          political_party_members: [
            {
              id: 1,
              politician_id: 1,
              political_party_id: 2,
              start_belonging_date: null,
              end_belonging_date: null,
              political_party: {
                id: 2,
                name_kanji: '自由民主党',
                name_kana: 'じゆうみんしゅとう',
                abbreviation_kanji: '自民',
                abbreviation_kana: null,
              },
            },
          ],
        },
      },
      current_cv_term: {
        id: 1,
        start_date: '2022-08-01T00:00:00.000+09:00',
        end_date: '2022-09-01T00:00:00.000+09:00',
        created_at: '2022-08-26T22:50:03.641+09:00',
        updated_at: '2022-08-26T22:50:03.641+09:00',
      },
      is_my_constituency_member: true,
      is_login_user_possible_to_cv_on_term: true,
    },
    cvQuestionAndValues: {
      cv_question: {
        id: 1,
        question_sentence:
          '議員の直近１ヶ月の活動（初めて投票される方はこれまでの活動）に対するあなたの評価を選択してください。',
        note: null,
      },
      cv_evaluation_values: [
        {
          id: 1,
          cv_question_id: 1,
          value: 1,
          value_name: '大変評価する',
        },
        {
          id: 2,
          cv_question_id: 1,
          value: 2,
          value_name: 'まあまあ評価する',
        },
        {
          id: 3,
          cv_question_id: 1,
          value: 3,
          value_name: 'どちらでもない',
        },
        {
          id: 4,
          cv_question_id: 1,
          value: 4,
          value_name: 'あまり評価しない',
        },
        {
          id: 5,
          cv_question_id: 1,
          value: 5,
          value_name: '全く評価しない',
        },
      ],
    },
  };

  return (
    <Cheervote
      cvPoliticianBasicInfo={cvPoliticianBasicInfoData}
      cvMyConstituencyMemberBadge={cvMyConstituencyMemberBadge}
      activeCvTerm={activeCvTerm}
      cvPostForm={cvPostForm}
    />
  );
};

export default Home;

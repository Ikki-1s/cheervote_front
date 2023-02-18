import { css } from '@emotion/react';
import Layout from 'components/templates/common/Layout';
import PageCenterWrap from 'components/templates/common/PageCenterWrap';
import CvPoliticianBasicInfo from 'components/organisms/CvPoliticianBasicInfo';
import CvMyConstituencyMemberBadge from 'components/organisms/CvMyConstituencyMemberBadge';
import ActiveCvTerm from 'components/organisms/ActiveCvTerm';
import CvPostForm from 'components/ecosystems/CvPostForm';

const styles = {
  wrap: css`
    display: flex;
    flex-direction: column;
    gap: 30px;
  `,
};

type CheervoteTemplateProps = {
  cvPoliticianBasicInfo: Parameters<typeof CvPoliticianBasicInfo>[0] | null;
  cvMyConstituencyMemberBadge: Parameters<typeof CvMyConstituencyMemberBadge>[0];
  activeCvTerm: Parameters<typeof ActiveCvTerm>[0] | null;
  cvPostForm: Parameters<typeof CvPostForm>[0];
};

const Cheervote = ({
  cvPoliticianBasicInfo,
  cvMyConstituencyMemberBadge,
  activeCvTerm,
  cvPostForm,
}: CheervoteTemplateProps) => {
  return (
    <Layout>
      <div css={styles.wrap}>
        <h1>評価の投票</h1>
        {cvPoliticianBasicInfo ? (
          <>
            <CvPoliticianBasicInfo {...cvPoliticianBasicInfo} />
            <CvMyConstituencyMemberBadge {...cvMyConstituencyMemberBadge} />
            {activeCvTerm && <ActiveCvTerm {...activeCvTerm} />}
            <PageCenterWrap>
              <CvPostForm {...cvPostForm} />
            </PageCenterWrap>
          </>
        ) : (
          <PageCenterWrap>
            <p>指定の政治家がいないか、現役議員ではないため、評価の投票をすることができません。</p>
          </PageCenterWrap>
        )}
      </div>
    </Layout>
  );
};

export default Cheervote;

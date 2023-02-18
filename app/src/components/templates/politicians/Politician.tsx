import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import Layout from 'components/templates/common/Layout';
import PageCenterWrap from '../common/PageCenterWrap';
import PoliticianCvResult from 'components/ecosystems/PoliticianCvResult';
import PoliticianBasicInfoTable from 'components/organisms/PoliticianBasicInfoTable';

const styles = {
  notFound: css`
    padding-top: 100px;
  `,
  wrap: css`
    display: flex;
    flex-direction: column;
    gap: 80px;
  `,
};

type PoliticianTemplateProps = {
  politicianBasicInfoTable: Parameters<typeof PoliticianBasicInfoTable>[0] | null;
};

const Politician = ({ politicianBasicInfoTable }: PoliticianTemplateProps) => {
  const router = useRouter();
  const politicianId = router.query.id as string;

  return (
    <Layout>
      <PageCenterWrap>
        {politicianBasicInfoTable ? (
          <div css={styles.wrap}>
            <PoliticianBasicInfoTable {...politicianBasicInfoTable} />
            <PoliticianCvResult politicianId={politicianId} />
          </div>
        ) : (
          <div css={styles.notFound}>
            指定の政治家がいないか、現役議員ではないため、表示できません
          </div>
        )}
      </PageCenterWrap>
    </Layout>
  );
};

export default Politician;

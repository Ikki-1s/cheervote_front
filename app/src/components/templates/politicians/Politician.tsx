import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from 'components/templates/common/Layout';
import PageCenterWrap from 'components/templates/common/PageCenterWrap';
import PoliticianCvResult from 'components/ecosystems/PoliticianCvResult';
import PoliticianBasicInfoTable from 'components/organisms/PoliticianBasicInfoTable';
import ReplacementText from 'components/atoms/ReplacementText';
import LinkButton from 'components/atoms/LinkButton';

const styles = {
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
          // cf. organisms/ReplacementMessageBox
          <ReplacementText marginTop={120} gap={60} alignItems='center'>
            <p>指定の政治家がいないか、現役議員ではないため、表示できません</p>
            <Link href='/' passHref>
              <LinkButton fontSize='lg' bold paddingLR={100}>
                TOPページへ
              </LinkButton>
            </Link>
          </ReplacementText>
        )}
      </PageCenterWrap>
    </Layout>
  );
};

export default Politician;

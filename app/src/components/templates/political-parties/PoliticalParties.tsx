import { css } from '@emotion/react';
import Layout from 'components/templates/common/Layout';
import PageCenterWrap from 'components/templates/common/PageCenterWrap';
import PoliticalPartiesTable from 'components/organisms/PoliticalPartiesTable';
import { valueof } from 'domains';

const styles = {
  politicalPartiesTableWrap: css`
    margin-top: 10px;
  `,
};

type PoliticalPartiesTemplateProps = {
  politicalPartiesTable: valueof<
    Pick<Parameters<typeof PoliticalPartiesTable>[0], 'politicalParties'>
  >;
};

const PoliticalParties = ({ politicalPartiesTable }: PoliticalPartiesTemplateProps) => {
  return (
    <Layout>
      <h1>政党別国会議員</h1>
      <PageCenterWrap>
        <div css={styles.politicalPartiesTableWrap}>
          <PoliticalPartiesTable politicalParties={politicalPartiesTable} />
        </div>
      </PageCenterWrap>
    </Layout>
  );
};

export default PoliticalParties;

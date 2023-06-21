import { css } from '@emotion/react';
import Layout from 'components/templates/common/Layout';
import PoliticalPartiesTable from 'components/organisms/PoliticalPartiesTable';
import { valueof } from 'domains';

const styles = {
  politicalPartiesTableWrap: css`
    margin-top: 20px;
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
      <div css={styles.politicalPartiesTableWrap}>
        <PoliticalPartiesTable politicalParties={politicalPartiesTable} />
      </div>
    </Layout>
  );
};

export default PoliticalParties;

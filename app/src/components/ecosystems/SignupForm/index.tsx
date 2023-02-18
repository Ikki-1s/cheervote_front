import { getPrefWithAllConstituenciesAndBlocks } from 'domains';
import useSWRImmutable from 'swr/immutable';
import Organism from 'components/organisms/SignupForm';

const SignupForm = () => {
  const { data: prefs } = useSWRImmutable(
    '/prefectures/all_constituencies_and_blocks',
    getPrefWithAllConstituenciesAndBlocks,
  );

  return <Organism prefectures={prefs} />;
};

export default SignupForm;

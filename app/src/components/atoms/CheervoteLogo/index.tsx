import Logo from '/public/CHEERVOTE_Logo.svg';
import Link from 'next/link';

type Props = {
  width?: number;
  height?: number;
};

const CheervoteLogo = (props: Props) => {
  const { width = 175, height = 42.32 } = props;

  return (
    <Link href='/' passHref>
      <a>
        <Logo width={width} height={height} />
      </a>
    </Link>
  );
};

export default CheervoteLogo;

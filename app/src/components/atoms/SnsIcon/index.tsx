import Image from 'next/image';
import Twitter from '/public/sns/Twitter_social_icons_rounded _square_blue.svg';
import Home from '/public/sns/homepage.svg';
import HomeDisabled from '/public/sns/homepage_disabled.svg';

type Props = {
  snsType: 'home' | 'homeDisabled' | 'twitter' | 'youtube' | 'facebook' | 'instagram' | 'line';
  width?: number;
  height?: number;
  url: string;
};

const SwitchType = (props: Props) => {
  const { snsType, width, height } = props;

  switch (snsType) {
    case 'home':
      return <Home width={width ? width : 48} height={height ? height : 48} />;
    case 'homeDisabled':
      return <HomeDisabled width={width ? width : 48} height={height ? height : 48} />;
    case 'twitter':
      return <Twitter width={width ? width : 48} height={height ? height : 48} />;
    case 'youtube':
      return (
        <Image
          src='/sns/youtube_social_icon_red_1080px.png'
          alt='YouTube'
          width={width ? width : 57.25}
          height={height ? height : 40}
        />
      );
    case 'facebook':
      return (
        <Image
          src='/sns/f_logo_RGB-Blue_1024.png'
          alt='facebook'
          width={width ? width : 50}
          height={height ? height : 50}
        />
      );
    case 'instagram':
      return (
        <Image
          src='/sns/Instagram_Glyph_Gradient_RGB.png'
          alt='Instagram'
          width={width ? width : 48}
          height={height ? height : 48}
        />
      );
    case 'line':
      return (
        <Image
          src='/sns/LINE_Brand_icon.png'
          alt='LINE'
          width={width ? width : 48}
          height={height ? height : 48}
        />
      );
  }
};

const SnsIcon = (props: Props) => {
  const snsComponent = SwitchType(props);
  return (
    <a href={props.url} target='_blank'>
      {snsComponent}
    </a>
  );
};

export default SnsIcon;

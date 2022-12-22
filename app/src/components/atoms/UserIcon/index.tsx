import UserDefaultIcon from '/public/UserIcon.svg';

type Props = {
  widthAndHeight?: number;
};

const UserIcon = (props: Props) => {
  const { widthAndHeight = 38 } = props;

  return <UserDefaultIcon width={widthAndHeight} height={widthAndHeight} />;
};

export default UserIcon;

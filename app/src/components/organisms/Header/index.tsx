import Link from 'next/link';
import { css } from '@emotion/react';
import { color } from 'styles/theme';
import CheervoteLogo from 'components/atoms/CheervoteLogo';
import ColorButton from 'components/atoms/ColorButton';
import NavigationDropDownDetail, {
  NavigationDropDownDetailProps,
} from 'components/atoms/NavigationDropDownDetail';
import NavigationDropDownButton from 'components/molecules/NavigationDropDownButton';

const styles = {
  header: css`
    position: sticky;
    top: 0px;
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2px 24px 2px 20px;
    width: 100%;
    min-width: 768px;
    background-color: ${color.background.normal};
    border-bottom: 1px solid ${color.gray};
  `,
  headerLeftWrap: css`
    display: flex;
    align-items: center;
    padding-top: 2px;
    gap: 20px;
  `,
  afterLoginWrap: css`
    display: flex;
    align-items: center;
    gap: 12px;
  `,
  beforeLoginWrap: css`
    display: flex;
    align-items: center;
    gap: 20px;
  `,
};

type Props = {
  navigationDropDownData: {
    buttonTitle: string;
    details: NavigationDropDownDetailProps[];
  }[];
  isLoadingUser: boolean;
  userDropDownMenu?: {
    userName: string;
    userIconSrc?: string | null;
  };
  userDropDownDetails: NavigationDropDownDetailProps[];
  handleSignOut: () => Promise<void>;
};

const Header = ({
  navigationDropDownData,
  isLoadingUser,
  userDropDownMenu,
  userDropDownDetails,
  handleSignOut,
}: Props) => {
  return (
    <header css={styles.header}>
      <div css={styles.headerLeftWrap}>
        <CheervoteLogo />
        <nav>
          {navigationDropDownData.map((data) => {
            return (
              <NavigationDropDownButton
                key={data.buttonTitle}
                title={data.buttonTitle}
                height={40.25}
              >
                {data.details.map((detail) => {
                  return (
                    <NavigationDropDownDetail
                      key={detail.title}
                      title={detail.title}
                      url={detail.url}
                    />
                  );
                })}
              </NavigationDropDownButton>
            );
          })}
        </nav>
      </div>
      {isLoadingUser ? (
        <></>
      ) : userDropDownMenu ? (
        <div css={styles.afterLoginWrap}>
          <NavigationDropDownButton
            title={userDropDownMenu.userName}
            height={40.25}
            fontSize='sm'
            containerFlexEnd
            withUserIcon
            userIconSrc={userDropDownMenu.userIconSrc}
            titleMaxLength={15}
            addCharacter='...'
          >
            {userDropDownDetails.map((detail) => {
              return (
                <NavigationDropDownDetail
                  key={detail.title}
                  title={detail.title}
                  url={detail.url}
                />
              );
            })}
          </NavigationDropDownButton>
          <ColorButton color='blue' height={40.25} fontSize='sm' onClick={handleSignOut}>
            ログアウト
          </ColorButton>
        </div>
      ) : (
        <div css={styles.beforeLoginWrap}>
          <Link href='/signin' passHref>
            <ColorButton color='blue' width={84} height={40.25} fontSize='sm'>
              ログイン
            </ColorButton>
          </Link>
          <Link href='/signup' passHref>
            <ColorButton color='pink' width={116} height={40.25} fontSize='sm'>
              ユーザー登録
            </ColorButton>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;

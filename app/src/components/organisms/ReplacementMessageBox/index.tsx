import { ReactNode, useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { HistoryContext } from 'stores/HistoryContext';
import ColorButton from 'components/atoms/ColorButton';
import LinkButton from 'components/atoms/LinkButton';
import ReplacementText from 'components/atoms/ReplacementText';

type Props = {
  messagePattern:
    | 'alreadyVoted'
    | 'notMyConstituencyMember'
    | 'notLoggedin'
    | 'outOfCvTerm'
    | 'ActiveMemberNotFound';
};

const ReplacementMessageBox = ({ messagePattern }: Props) => {
  const history = useContext(HistoryContext);
  const [backPagePath, setBackPagePath] = useState('');

  useEffect(() => {
    setBackPagePath(history[0]);
  }, []);

  const ReplacementTextWrap = ({ children, gap }: { children: ReactNode; gap?: number }) => {
    return (
      <ReplacementText gap={gap ? gap : 50} alignItems='center'>
        {children}
      </ReplacementText>
    );
  };

  const PageBackButton = () => {
    return (
      <Link href={backPagePath} passHref>
        <LinkButton fontSize='lg' bold width={300}>
          前のページへ戻る
        </LinkButton>
      </Link>
    );
  };

  const TopPageBackButton = () => {
    return (
      <Link href='/' passHref>
        <LinkButton fontSize='lg' bold width={300}>
          TOPページへ
        </LinkButton>
      </Link>
    );
  };

  switch (messagePattern) {
    case 'alreadyVoted':
      return (
        <ReplacementTextWrap>
          <div>
            <p>現在の投票受付期間にすでに投票済みです。</p>
            <p>次回の受付期間での投票もよろしくお願いいたします。</p>
          </div>
          <PageBackButton />
        </ReplacementTextWrap>
      );
    case 'notMyConstituencyMember':
      return (
        <ReplacementTextWrap>
          <p>マイ選挙区の議員でないため、この議員に評価の投票をすることはできません。</p>
          <PageBackButton />
        </ReplacementTextWrap>
      );
    case 'notLoggedin':
      return (
        <ReplacementTextWrap>
          <p>マイ選挙区の議員である場合、ログインすると 評価の投票をすることができます。</p>
          <Link href='/signin' passHref>
            <ColorButton color='blue' marginTop={40} fontSize='lg' width={300}>
              ログインする
            </ColorButton>
          </Link>
          <PageBackButton />
        </ReplacementTextWrap>
      );
    case 'outOfCvTerm':
      return (
        <ReplacementTextWrap>
          <p>評価の投票の受付期間外です。</p>
          <PageBackButton />
        </ReplacementTextWrap>
      );
    case 'ActiveMemberNotFound':
      return (
        <ReplacementTextWrap>
          <p>指定の政治家がいないか、現役議員ではないため、評価の投票をすることができません。</p>
          <TopPageBackButton />
        </ReplacementTextWrap>
      );
    default:
      return (
        <ReplacementTextWrap>
          <p>想定されていないアクセスです。</p>
          <TopPageBackButton />
        </ReplacementTextWrap>
      );
  }
};

export default ReplacementMessageBox;

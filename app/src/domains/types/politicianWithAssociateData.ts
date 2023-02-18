import {
  isPropertyAccessible,
  HcMemberWithAssociateData,
  isHcMemberWithAssociateData,
  HrMemberWithAssociateData,
  isHrMemberWithAssociateData,
  PoliticalPartyMember,
  isPoliticalPartyMember,
  Politician,
  isPolitician,
} from 'domains';

// 政治家（関連テーブルデータ含む）
export type PoliticianWithAssociateData = Politician & {
  hr_members?: HrMemberWithAssociateData[];
  hc_members?: HcMemberWithAssociateData[];
  political_party_members: PoliticalPartyMember[];
};

/// 政治家（関連テーブルデータ含む） ///
export const isPoliticianWithAssociateData = (arg: unknown): arg is PoliticianWithAssociateData => {
  if (!isPropertyAccessible(arg) || !isPropertyAccessible(arg.political_party_members))
    return false;

  // political_party_members部分のチェック
  // 配列か否かを判定
  if (!Array.isArray(arg.political_party_members)) return false;
  // 全てPoliticalPartyMember型か否かを判定
  if (arg.political_party_members.some((v) => !isPoliticalPartyMember(v))) return false;

  // hr_members部分のデータがある場合のチェック
  if (
    isPropertyAccessible(arg.hr_members) &&
    Array.isArray(arg.hr_members) &&
    arg.hr_members.some((v) => !isHrMemberWithAssociateData(v))
  )
    return false;

  // hc_members部分のデータがある場合のチェック
  if (
    isPropertyAccessible(arg.hc_members) &&
    Array.isArray(arg.hc_members) &&
    arg.hc_members.some((v) => !isHcMemberWithAssociateData(v))
  )
    return false;

  // 政治家部分のチェック
  return isPolitician(arg);
};

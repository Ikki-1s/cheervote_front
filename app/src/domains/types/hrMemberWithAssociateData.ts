import {
  HrConstituencyWithPref,
  HrElectionTime,
  HrMember,
  HrPrBlock,
  isHrConstituencyWithPref,
  isHrElectionTime,
  isHrMember,
  isHrPrBlock,
  isPropertyAccessible,
} from 'domains';

// 衆議院議員（選挙回・小選挙区・比例ブロック含む）
export type HrMemberWithAssociateData = HrMember & {
  hr_election_time: HrElectionTime;
  hr_constituency?: HrConstituencyWithPref;
  hr_pr_block?: HrPrBlock;
};

export const isHrMemberWithAssociateData = (arg: unknown): arg is HrMemberWithAssociateData => {
  if (!isPropertyAccessible(arg) || !isPropertyAccessible(arg.hr_election_time)) return false;

  // 衆議院小選挙区がある場合のチェック
  if (isPropertyAccessible(arg.hr_constituency) && !isHrConstituencyWithPref(arg.hr_constituency))
    return false;

  // 衆議院比例代表ブロックがある場合のチェック
  if (isPropertyAccessible(arg.hr_pr_block) && !isHrPrBlock(arg.hr_pr_block)) return false;

  // 衆議院選挙回のチェック
  if (!isHrElectionTime(arg.hr_election_time)) return false;

  // 衆議院議員のチェック
  return isHrMember(arg);
};

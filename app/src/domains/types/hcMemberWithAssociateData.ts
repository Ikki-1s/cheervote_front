import {
  HcConstituency,
  HcElectionTime,
  HcMember,
  isHcConstituency,
  isHcElectionTime,
  isHcMember,
  isPropertyAccessible,
} from 'domains';

// 参議院議員（選挙回・選挙区含む）
export type HcMemberWithAssociateData = HcMember & {
  hc_election_time: HcElectionTime;
  hc_constituency?: HcConstituency;
};

export const isHcMemberWithAssociateData = (arg: unknown): arg is HcMemberWithAssociateData => {
  if (!isPropertyAccessible(arg) || !isPropertyAccessible(arg.hc_election_time)) return false;

  // 参議院選挙区がある場合のチェック
  if (isPropertyAccessible(arg.hc_constituency) && !isHcConstituency(arg.hc_constituency))
    return false;

  // 参議院選挙回のチェック
  if (!isHcElectionTime(arg.hc_election_time)) return false;

  // 参議院議員のチェック
  return isHcMember(arg);
};

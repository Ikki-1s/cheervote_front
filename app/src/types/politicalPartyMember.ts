export type HrMember = {
  id: number;
  elected_system: number;
  hr_constituency?: {
    id: number;
    name: string;
    prefecture: {
      id: number;
      prefecture: string;
    };
  };
  hr_pr_block?: {
    id: number;
    block_name: string;
  };
};

export type PoliticalPartyHrMember = {
  id: number;
  politician: {
    id: number;
    last_name_kanji: string;
    first_name_kanji: string;
    last_name_kana: string;
    first_name_kana: string;
    hr_members: HrMember[];
  };
};

export type HcMember = {
  id: number;
  elected_system: number;
  hc_constituency?: {
    id: number;
    name: string;
  };
};

export type PoliticalPartyHcMember = {
  id: number;
  politician: {
    id: number;
    last_name_kanji: string;
    first_name_kanji: string;
    last_name_kana: string;
    first_name_kana: string;
    hc_members: HcMember[];
  };
};

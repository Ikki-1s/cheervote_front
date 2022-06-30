import fetch from 'node-fetch';

import { HcConstituency } from 'types/hcConstituency';

// ユーザー定義型ガード
const isPropertyAccessible = (arg: unknown): arg is { [key: string]: unknown } => {
  // nullとundefinedの可能性を排除
  return arg != null;
};

const isHcConstituency = (arg: unknown): arg is HcConstituency => {
  if (!isPropertyAccessible(arg)) return false; // プロパティアクセス出来ない可能性を排除
  return (
    typeof arg.id === 'number' && typeof arg.name === 'string' && typeof arg.quota === 'number'
  );
};

export const getAllHcConstituenciesData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hc_constituencies`, {
    method: 'GET',
  });
  const allHcConstituenciesData = await res.json();

  if (Array.isArray(allHcConstituenciesData) && allHcConstituenciesData.every(isHcConstituency)) {
    return allHcConstituenciesData;
  } else {
    throw new Error();
  }
};

export const getAllHcConstituenciesIds = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hc_constituencies`, {
    method: 'GET',
  });
  const allHcConstituencyData = await res.json();
  if (Array.isArray(allHcConstituencyData) && allHcConstituencyData.every(isHcConstituency)) {
    return allHcConstituencyData.map((hcConstituencyData) => {
      return {
        params: {
          id: hcConstituencyData.id.toString(),
        },
      };
    });
  } else {
    throw new Error();
  }
};

export const getHcConstituencyName = async (hcConctituencyId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/hc_constituencies/${hcConctituencyId}`,
    {
      method: 'GET',
    },
  );
  const hcConstituencyData = await res.json();
  if (Array.isArray(hcConstituencyData) && hcConstituencyData.every(isHcConstituency)) {
    const hcConstituencyName = hcConstituencyData[0].name;
    return hcConstituencyName;
  } else {
    throw new Error();
  }
};

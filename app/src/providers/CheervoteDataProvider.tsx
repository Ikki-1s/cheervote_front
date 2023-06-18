import { createContext } from 'react';
import { CheervotePostData } from 'types';

export const CheervotePostDataContext = createContext(
  {} as {
    cheervotePostData: CheervotePostData;
    setCheervotePostData: React.Dispatch<React.SetStateAction<CheervotePostData>>;
    cheervoteComplete: boolean;
    setCheervoteComplete: React.Dispatch<React.SetStateAction<boolean>>;
  },
);

// export const CheervoteDataProvider = (props: any) => {
//   const { children } = props;

//   // const sampleObj = { sampleValue: 'テスト' };
//   const [cheervotePostData, setCheervotePostData] = useState({});

//   return (
//     // <CheervoteDataContext.Provider value={sampleObj}>{children}</CheervoteDataContext.Provider>
//     <CheervotePostDataContext.Provider value={{ cheervotePostData, setCheervotePostData }}>
//       {children}
//     </CheervotePostDataContext.Provider>
//   );
// };

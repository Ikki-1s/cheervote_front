import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { css } from '@emotion/react';
import { fontWeight, typography } from 'styles/theme';
import { PrefWithAllConstituenciesAndBlocks, signup, SignupParams } from 'domains';
import { eliminateToHuKen, setClientSideCookie } from 'utils';
import ColorButton from 'components/atoms/ColorButton';
import FormInputErrorMessage from 'components/atoms/FormInputErrorMessage';
import FormLabel from 'components/atoms/FormLabel';
import SelectBoxRHF from 'components/atoms/SelectBoxRHF';
import Input from 'components/atoms/Input';
import FormSubmitErrorMessage from 'components/atoms/FormSubmitErrorMessage';

const styles = {
  wrap: css`
    width: 100%;
    max-width: 410px;
  `,
  form: css`
    display: flex;
    flex-direction: column;
  `,
  formItemWrap: css`
    margin-top: 14px;
  `,
  formItem: css`
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,
  formBody: css`
    display: flex;
    flex-direction: column;
    gap: 4px;
  `,
  annotation: css`
    margin-left: 10px;
    ${typography.xs}
    ${fontWeight.regular}
  `,
};

const signupSuccessStyles = {
  wrap: css`
    width: 100%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin-top: 40px;
  `,
  title: css`
    ${typography.heading3}
    ${fontWeight.bold}
  `,
  body: css`
    line-height: 1.7em;
  `,
};

type Inputs = SignupParams;

type SelectOptionListProps = Parameters<typeof SelectBoxRHF>[0]['selectOption']['optionList'];

type Props = {
  prefectures: PrefWithAllConstituenciesAndBlocks[] | undefined;
};

const SignupForm = ({ prefectures }: Props) => {
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);
  const [hrConstituencyList, setHrConstituencyList] = useState<SelectOptionListProps>();
  const [hcConstituencyList, setHcConstituencyList] = useState<SelectOptionListProps>();
  const [signupSuccess, setSignupSuccess] = useState<boolean>(false);

  const {
    register, // 入力または選択された要素を登録し検証
    handleSubmit, // 検証が成功するとフォーム内のデータを受け取る
    formState: { errors }, // バリデーションエラーを受け取る
    getValues,
    trigger,
    setValue,
    // reset,
  } = useForm<Inputs>({
    criteriaMode: 'firstError',
    shouldFocusError: true,
    mode: 'onBlur',
  });

  // 都道府県セレクトボックス用リスト
  const prefList = {
    option: prefectures?.map((pref) => ({
      key: pref.id,
      value: pref.id,
      label: pref.prefecture,
    })),
  };

  // 都道府県セレクトボックス値変更時処理
  const handlePrefChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // 全ての都道府県とそれに紐づく衆議院小選挙区（・衆議院比例代表ブロック）・参議院選挙区の
    // リストから都道府県セレクトボックスで指定した都道府県のオブジェクトを抽出
    const selectedPrefObj = prefectures?.find((pref) => pref.id.toString() === e.target.value);

    // 衆議院小選挙区セレクトボックスの選択肢を作成、stateにセット
    const hrConstituencies = selectedPrefObj?.hr_constituencies.map((hrCostituency) => ({
      key: hrCostituency.id,
      value: hrCostituency.id,
      label: eliminateToHuKen(selectedPrefObj.prefecture) + hrCostituency.name,
    }));
    setHrConstituencyList(hrConstituencies);

    // 参議院選挙区セレクトボックスの選択肢を作成、stateにセット
    const hcConstituencies = selectedPrefObj && [
      {
        key: selectedPrefObj.hc_constituency_pref.hc_constituency.id,
        value: selectedPrefObj.hc_constituency_pref.hc_constituency.id,
        label: selectedPrefObj.hc_constituency_pref.hc_constituency.name,
      },
    ];
    setHcConstituencyList(hcConstituencies);
    // 参議院選挙区は自動で値を選択した状態にするため、setValueを実行
    selectedPrefObj &&
      setValue('hcConstituency', selectedPrefObj.hc_constituency_pref.hc_constituency.id);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await signup(data);

      if (res.status === 200) {
        setSignupSuccess(true);
      } else {
        console.log(res);
        setAlertMessageOpen(true);
      }
    } catch (err) {
      console.log(err);
      setAlertMessageOpen(true);
    }
  };

  return signupSuccess ? (
    <div css={signupSuccessStyles.wrap}>
      <div css={signupSuccessStyles.title}>確認メールを送信しました</div>
      <div css={signupSuccessStyles.body}>
        <p>ご登録いただいたメールアドレス宛に受信確認用のメールを送信しました。</p>
        <p>
          届いたメールをご確認いただき、「アカウント確認」リンクをクリックして、ユーザー登録を完了してください。
        </p>
        <p>※「アカウント確認」リンクのクリックの有効期間は24時間以内です。</p>
      </div>
    </div>
  ) : (
    <div css={styles.wrap}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate css={styles.form}>
        {alertMessageOpen && (
          <FormSubmitErrorMessage>
            登録に失敗しました。入力内容を確認してください
          </FormSubmitErrorMessage>
        )}
        {/* ユーザー名 */}
        <div css={styles.formItemWrap}>
          <div css={styles.formItem}>
            <FormLabel htmlFor='name'>ユーザー名</FormLabel>
            <div css={styles.formBody}>
              <Input
                id='name'
                type='text'
                register={register('name', {
                  required: 'ユーザー名を入力してください',
                  maxLength: { value: 30, message: '30文字以内で入力してください' },
                })}
              />
              {errors.name && errors.name.message && (
                <FormInputErrorMessage title={errors.name.message} />
              )}
            </div>
          </div>
        </div>
        {/* メールアドレス */}
        <div css={styles.formItemWrap}>
          <div css={styles.formItem}>
            <FormLabel htmlFor='email'>メールアドレス</FormLabel>
            <div css={styles.formBody}>
              <Input
                id='email'
                type='email'
                register={register('email', {
                  required: 'メールアドレスを入力してください',
                  maxLength: { value: 254, message: '254文字以内で入力してください' },
                  pattern: {
                    value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: 'メールアドレスの形式が正しくありません',
                  },
                })}
              />
              {errors.email && errors.email.message && (
                <FormInputErrorMessage title={errors.email.message} />
              )}
            </div>
          </div>
        </div>
        {/* パスワード */}
        <div css={styles.formItemWrap}>
          <div css={styles.formItem}>
            <FormLabel htmlFor='password'>パスワード</FormLabel>
            <div css={styles.formBody}>
              <Input
                id='password'
                type='password'
                register={register('password', {
                  required: 'パスワードを入力してください',
                  onBlur: () => {
                    if (getValues('passwordConfirmation')) {
                      trigger('passwordConfirmation');
                    }
                  },
                })}
              />
              {errors.password && errors.password.message && (
                <FormInputErrorMessage title={errors.password.message} />
              )}
            </div>
          </div>
        </div>
        {/* パスワード（再確認） */}
        <div css={styles.formItemWrap}>
          <div css={styles.formItem}>
            <FormLabel htmlFor='passwordConfirmation'>確認のため同じパスワードを再入力</FormLabel>
            <div css={styles.formBody}>
              <Input
                id='passwordConfirmation'
                type='password'
                register={register('passwordConfirmation', {
                  required: '同じパスワードを再入力してください',
                  validate: (value) => {
                    return value === getValues('password') || 'パスワードが一致しません';
                  },
                })}
              />
              {errors.passwordConfirmation && errors.passwordConfirmation.message && (
                <FormInputErrorMessage title={errors.passwordConfirmation.message} />
              )}
            </div>
          </div>
        </div>
        {/* 都道府県 */}
        <div css={styles.formItemWrap}>
          <div css={styles.formItem}>
            <FormLabel htmlFor='prefecture'>都道府県</FormLabel>
            <div css={styles.formBody}>
              <SelectBoxRHF
                select={{
                  id: 'prefecture',
                  register: register('prefecture', {
                    required: '選択してください',
                    onChange: handlePrefChange,
                  }),
                }}
                selectOption={{
                  isSetHidden: true,
                  optionList: prefList.option,
                }}
              />
              {errors.prefecture && errors.prefecture.message && (
                <FormInputErrorMessage title={errors.prefecture.message} />
              )}
            </div>
          </div>
        </div>
        {/* 衆議院小選挙区 */}
        <div css={styles.formItemWrap}>
          <div css={styles.formItem}>
            <FormLabel htmlFor='hrConstituency'>衆議院小選挙区</FormLabel>
            <div css={styles.formBody}>
              {/* 非制御コンポーネントのため、stateの変化に対してセレクトボックスの
                  選択肢だけでなく、セレクトボックスをまるごと再レンダリングする必要がある */}
              {hrConstituencyList ? (
                <SelectBoxRHF
                  select={{
                    id: 'hrConstituency',
                    register: register('hrConstituency', { required: '選択してください' }),
                  }}
                  selectOption={{
                    isSetHidden: true,
                    optionList: hrConstituencyList,
                  }}
                />
              ) : (
                <SelectBoxRHF
                  select={{
                    id: 'hrConstituency',
                    register: register('hrConstituency', { required: '選択してください' }),
                    isDisabled: true,
                  }}
                  selectOption={{
                    isSetHidden: true,
                    hiddenTitle: '--------------',
                  }}
                />
              )}
              {errors.hrConstituency && errors.hrConstituency.message && (
                <FormInputErrorMessage title={errors.hrConstituency.message} />
              )}
            </div>
          </div>
        </div>
        {/* 参議院選挙区 */}
        <div css={styles.formItemWrap}>
          <div css={styles.formItem}>
            <FormLabel htmlFor='hcConstituency'>
              参議院選挙区
              <span css={styles.annotation}>※都道府県を選択すると自動で選択されます</span>
            </FormLabel>
            <div css={styles.formBody}>
              {/* 非制御コンポーネントのため、stateの変化に対してセレクトボックスの
                  選択肢だけでなく、セレクトボックスをまるごと再レンダリングする必要がある */}
              {hcConstituencyList ? (
                <SelectBoxRHF
                  select={{
                    id: 'hcConstituency',
                    register: register('hcConstituency'),
                  }}
                  selectOption={{
                    optionList: hcConstituencyList,
                  }}
                />
              ) : (
                <SelectBoxRHF
                  select={{
                    id: 'hcConstituency',
                    register: register('hcConstituency'),
                    isDisabled: true,
                  }}
                  selectOption={{
                    isSetHidden: true,
                    hiddenTitle: '--------------',
                  }}
                />
              )}
              {/* {errors.hcConstituency && errors.hcConstituency.message && (
                <FormInputErrorMessage title={errors.hcConstituency.message} />
              )} */}
            </div>
          </div>
        </div>
        <ColorButton type='submit' color='pink' height={48} fontWeight='medium' marginTop={36}>
          ユーザー登録
        </ColorButton>
      </form>
    </div>
  );
};

export default SignupForm;

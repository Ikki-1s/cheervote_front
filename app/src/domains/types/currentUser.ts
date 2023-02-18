import { isPropertyAccessible } from 'domains';
import { isUser, User } from './user';

// 認証済みユーザー(data部分)（auth/sessions）
export type CurrentUser = {
  is_login: boolean;
  message?: string;
  data?: User;
};

export const isCurrentUser = (arg: unknown): arg is CurrentUser => {
  if (!isPropertyAccessible(arg)) return false;

  // ユーザー部分のチェック
  if (isPropertyAccessible(arg.data)) {
    if (!isUser(arg.data)) return false;
  }

  // CurrentUser固有部分のチェック
  return (
    typeof arg.is_login === 'boolean' && ('message' in arg ? typeof arg.message === 'string' : true)
  );
};

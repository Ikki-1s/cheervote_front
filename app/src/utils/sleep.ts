// 指定したミリ秒分sleep処理する
// 呼び出し時はasync function内でawaitを付けて実行する。
// 【引数】
// ms: number ミリ秒

export const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

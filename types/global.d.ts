type BaseResponse<T> = {
  code: number;
  data: T;
  msg: string;
  desc: string;
}

type IPage<T> = {
  pages: number;
  total: number;
  records: T[];
  current: number;
  size: number;
};

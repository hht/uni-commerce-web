interface Response<T> {
  /**
   * 是否成功
   */
  success: boolean;
  /**
   * 错误信息
   */
  message?: string;
  /**
   * 返回数据
   */
  data: T;
}

interface Pagination<T> {
  total: number;
  data: T[];
}

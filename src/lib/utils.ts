import dayjs from "dayjs";

/**
 * 生成以当前时间戳加随机数为名的ID
 * @param length 长度
 * @returns
 */
export const uniq = (length = 6) =>
  dayjs().format("YYYYMMDDHHmmssSSS") +
  Math.random().toFixed(length).slice(-length);

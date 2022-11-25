import { useRequest as useFetch } from "ahooks";
import { Options, Service } from "ahooks/lib/useRequest/src/types";
import { message } from "antd";
import axios, { AxiosResponse } from "axios";
import { omit } from "lodash";

export const baseUrl = "http://localhost:3000";

axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response: AxiosResponse<Response<any>>) => {
    const { success, data, message } = response.data;
    if (!success) {
      return Promise.reject({ message });
    }
    return data;
  },
  (error) => {
    if (error) {
      return Promise.reject(error);
    } else {
      return Promise.resolve({});
    }
  }
);

export const request = async <T, V>(
  service: string,
  method: "GET" | "POST",
  data: V
): Promise<T> => {
  const uri = service.startsWith("http") ? service : `${baseUrl}${service}`;
  if (method === "GET") {
    return await axios.get<any, T, any>(uri, {
      params: data,
    });
  }
  if (method === "POST") {
    return await axios.post<any, T, any>(uri, data);
  }
  return Promise.reject(new Error("不支持的方法"));
};

export const useRequest = <T>(
  service: Service<T, any[]>,
  options?: Options<T, any[]> | undefined
) => {
  return useFetch<T, any[]>(service, {
    throttleWait: 1000,
    onError: (e: Error, params: any) => {
      if (options?.onError) {
        options.onError(e, params);
      } else {
        message.error(e.message);
      }
    },
    ...omit(options, "onError"),
  });
};

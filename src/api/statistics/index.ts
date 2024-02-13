//统一管理项目用户相关的接口
import request from "@/utils/request";

//项目用户相关的请求地址
enum URL {
  COUNT = "/statistics/count",
  COUNT_INVOKE_TOP = "/statistics/count/invoke_top",
  COUNT_USER_INVOKE_TOP = "/statistics/count/user_invoke_top"
}

export const reqCount = async () =>
  request.get<never, BaseResponse<StatisticsAPI.StatisticsCountVO>>(URL.COUNT);

export const reqCountInvokeTop10 = async () =>
  request.get<never, BaseResponse<StatisticsAPI.StatisticsItfCountVO[]>>(URL.COUNT_INVOKE_TOP);

export const reqCountUserInvokeTop10 = async () =>
  request.get<never, BaseResponse<StatisticsAPI.StatisticsItfCountVO[]>>(URL.COUNT_USER_INVOKE_TOP);

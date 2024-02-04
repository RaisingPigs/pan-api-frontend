//统一管理项目用户相关的接口
import request from "@/utils/request";

//项目用户相关的请求地址
enum URL {
  LOGIN = "/sys/login",
  GET_LOGIN_USER = "/sys/user",
  LOGOUT = "/sys/logout"
}

//登录接口
export const reqLogin = async (data: LoginAPI.UserLoginReq) =>
  request.post<LoginAPI.UserLoginReq, BaseResponse<string>>(URL.LOGIN, data);

//获取用户信息
export const reqLoginUser = async () =>
  request.get<never, BaseResponse<UserAPI.UserVO>>(URL.GET_LOGIN_USER);

//退出登录
export const reqLogout = async () => request.post<never, never>(URL.LOGOUT);

//统一管理项目用户相关的接口
import request from "@/utils/request";

export async function reqAddUser(data: UserAPI.UserAddReq) {
  return request.post<any, BaseResponse<string>>("/user/add", data);
}

export async function reqDeleteUser(id: string) {
  return request.delete<any, BaseResponse<never>>(`/user/delete/${id}`);
}

export async function reqGetUserById(id: string) {
  return request.get<any, BaseResponse<UserAPI.UserVO>>(`/user/get/${id}`);
}

export async function reqListUser(data: UserAPI.UserQueryReq) {
  return request.post<any, BaseResponse<Array<UserAPI.UserVO>>>(
    "/user/list",
    data
  );
}

export async function reqListUserByPage(data: UserAPI.UserQueryReq) {
  return request.post<any, BaseResponse<IPage<UserAPI.UserVO>>>(
    "/user/list/page",
    data
  );
}

export async function reqUpdateUser(data: UserAPI.UserUpdateReq) {
  return request.put<any, BaseResponse<never>>("/user/update", data);
}

export async function reqGetUserWithAkSk() {
  return request.post<any, BaseResponse<UserAPI.UserAkSkVO>>(`/user/ak-sk`);
}

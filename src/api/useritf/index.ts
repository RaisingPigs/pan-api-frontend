import request from "@/utils/request";

export async function reqAddUserItf(data: UserItfAPI.UserItfAddReq) {
  return request.post<any, BaseResponse<number>>("/user-itf/add", data);
}

export async function reqCheckInvokeAuth(data: UserItfAPI.InvokeAuthCheckReq) {
  return request.post<any, BaseResponse<boolean>>(
    "/user-itf/check-invoke-auth",
    data
  );
}

export async function reqInvokeCountIncrement(data: UserItfAPI.InvokeCountReq) {
  return request.put<any, BaseResponse<never>>(
    "/user-itf/count-increment",
    data
  );
}

export async function reqDeleteUserItf(id: number) {
  return request.delete<any, BaseResponse<never>>(`/user-itf/delete/${id}`);
}

export async function reqGetUserItfById(id: number) {
  return request.delete<any, BaseResponse<never>>(`/user-itf/get/${id}`);
}

export async function reqListUserItf(data: UserItfAPI.UserItfQueryReq) {
  return request.post<any, BaseResponse<UserItfAPI.UserItfVO[]>>(
    "/user-itf/list",
    data
  );
}

export async function reqListUserItfByPage(data: UserItfAPI.UserItfQueryReq) {
  return request.post<any, BaseResponse<UserItfAPI.IPageUserItfVO>>(
    "/user-itf/list/page",
    data
  );
}

export async function reqUpdateUserItf(data: UserItfAPI.UserItfUpdateReq) {
  return request.put<any, BaseResponse<never>>("/user-itf/update", data);
}

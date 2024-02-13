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

export async function reqDeleteUserItf(id: string) {
  return request.delete<any, BaseResponse<never>>(`/user-itf/delete/${id}`);
}

export async function reqGetUserItfById(id: string) {
  return request.get<any, BaseResponse<UserItfAPI.UserItfVO>>(`/user-itf/get/${id}`);
}

export async function reqGetUserItfByItfId(itfId: string) {
  return request.get<any, BaseResponse<UserItfAPI.UserItfVO>>(`/user-itf/get`, { params: { itfId } });
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

export async function reqLeftCountIncrement(data: UserItfAPI.LeftCountReq) {
  return request.put<any, BaseResponse<never>>("/user-itf/count-increment/left", data);
}

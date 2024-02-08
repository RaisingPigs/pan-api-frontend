import request from "@/utils/request";

export async function reqAddItf(data: ItfAPI.ItfAddReq) {
  return request.post<any, BaseResponse<number>>("/itf/add", data);
}

export async function reqDeleteItf(id: string) {
  return request.delete<any, BaseResponse<never>>(`/itf/delete/${id}`);
}

export async function reqGetItfById(id: string) {
  return request.get<any, BaseResponse<ItfAPI.ItfVO>>(`/itf/get/${id}`);
}

export async function reqInvokeItf(data: ItfAPI.ItfInvokeReq) {
  return request.post<any, BaseResponse<string>>("/itf/invoke", data);
}

export async function reqListItf(data: ItfAPI.ItfQueryReq) {
  return request.post<any, BaseResponse<ItfAPI.ItfVO[]>>("/itf/list", data);
}

export async function reqListItfByPage(data: ItfAPI.ItfQueryReq) {
  return request.post<any, BaseResponse<ItfAPI.IPageItfVO>>("/itf/list/page", data);
}

export async function reqOfflineItf(id: string) {
  return request.put<any, BaseResponse<never>>(`/itf/offline/${id}`);
}

export async function reqOnlineItf(id: string) {
  return request.put<any, BaseResponse<never>>(`/itf/online/${id}`);
}

export async function reqGetItfByPathAndMethod(data: ItfAPI.PathMethodReq) {
  return request.post<any, BaseResponse<ItfAPI.ItfVO>>("/itf/path-method", data);
}

export async function reqUpdateItf(data: ItfAPI.ItfUpdateReq) {
  return request.put<any, BaseResponse<never>>("/itf/update", data);
}

export async function reqGetItfByUrlAndMethod(data: ItfAPI.UrlMethodReq) {
  return request.post<any, BaseResponse<ItfAPI.ItfVO>>("/itf/url-method", data);
}

export async function reqGetItfDetailsById(id: string) {
  return request.get<any, BaseResponse<ItfAPI.ItfDetailsVO>>(`/itf/details/${id}`);
}

declare namespace ItfAPI {
  type IPageItfVO = {
    current: number;
    size: number;
    total: number;
    records: ItfVO[];
    pages: number;
  };

  type ItfAddReq = {
    name: string;
    url: string;
    method: number;
    description: string;
    queryParamExample?: string;
    bodyParamExample?: string;
    respExample: string;
    reqHeader?: string;
    respHeader?: string;
  };

  type ItfInvokeReq = {
    id?: string;
    queryParam?: object;
    bodyParam?: object;
  };

  type ItfQueryReq = {
    pageNum?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: boolean;
    id?: string;
    name?: string;
    path?: string;
    url?: string;
    method?: number;
    description?: string;
    queryParamExample?: string;
    bodyParamExample?: string;
    respExample?: string;
    reqHeader?: string;
    respHeader?: string;
    status?: number;
    creatorId?: number;
    createTime?: string;
    updateTime?: string;
  };

  type ItfUpdateReq = {
    id?: string;
    name?: string;
    url?: string;
    method?: number;
    description?: string;
    queryParamExample?: string;
    bodyParamExample?: string;
    respExample?: string;
    reqHeader?: string;
    respHeader?: string;
    status?: number;
    userId?: number;
  };

  type ItfVO = {
    id: string;
    name: string;
    path: string;
    url: string;
    method: number;
    description: string;
    queryParamExample: string;
    bodyParamExample: string;
    respExample: string;
    reqHeader: string;
    respHeader: string;
    status: number;
    createTime: string;
    updateTime: string;
  };

  type PathMethodReq = {
    path: string;
    method: string;
  };

  type UrlMethodReq = {
    url: string;
    method: string;
  };

  type ItfDetailsVO = {
    itfVO: ItfVO,
    userItfVO: UserItfAPI.UserItfVO,
    queryParam: ParamVO[];
    bodyParam: ParamVO[];
    commonResp: ParamVO[];
    respData: ParamVO[];
  };

  type ParamVO = {
    id?: string;
    name?: string;
    required?: number;
    dataType?: string;
    description?: string;
  };
}

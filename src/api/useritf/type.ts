declare namespace UserItfAPI {
  type InvokeAuthCheckReq = {
    userId?: string;
    itfId?: string;
  };

  type InvokeCountReq = {
    userId?: string;
    itfId?: string;
  };

  type IPageUserItfVO = {
    current?: number;
    size?: number;
    total?: number;
    records?: UserItfVO[];
    pages?: number;
  };

  type UserItfAddReq = {
    userId?: string;
    itfId?: string;
    invokeCount?: number;
    leftCount?: number;
  };

  type UserItfQueryReq = {
    pageNum?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: boolean;
    id?: string;
    userId?: string;
    itfId?: string;
    invokeCount?: number;
    leftCount?: number;
    status?: number;
    createTime?: string;
    updateTime?: string;
  };

  type UserItfUpdateReq = {
    id?: string;
    leftCount?: number;
    status?: number;
  };

  type UserItfVO = {
    id: string;
    userId: string;
    itfId: string;
    invokeCount: number;
    leftCount: number;
    status: number;
  };

  type LeftCountReq = {
    id?: string;
    userId?: string;
    itfId?: string;
    count: number;
  };
}

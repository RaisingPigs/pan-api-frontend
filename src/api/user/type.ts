declare namespace UserAPI {
  type UserAddReq = {
    name: string;
    username?: string;
    avatar: string;
    gender: number;
    role: number;
  };

  type UserQueryReq = {
    pageNum?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: boolean;
    id?: number;
    name?: string;
    username?: string;
    avatar?: string;
    gender?: number;
    role?: number;
    creatorId?: number;
    createTime?: string;
    updaterId?: number;
    updateTime?: string;
  };

  type UserRegisterReq = {
    username: string;
    password: string;
    checkPassword: string;
  };

  type UserUpdateReq = {
    id?: string;
    name?: string;
    username?: string;
    avatar?: string;
    gender?: number;
    role?: number;
  };

  type UserVO = {
    id: string;
    name: string;
    username: string;
    avatar: string;
    gender: string;
    role: string;
    createTime: string;
    updateTime: string;
  };

  type AccessKeyReq = {
    accessKey?: string;
  };
}

declare namespace LoginAPI {
  type UserLoginReq = {
    username: string;
    password: string;
  };

  type UserRegisterReq = {
    username: string;
    password: string;
    checkPassword: string;
  };

  type Login3rdReq = {
    code: string;
    state: string;
  }
}

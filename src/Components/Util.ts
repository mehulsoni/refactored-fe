import * as ethUtil from "ethereumjs-util";
import {walletService} from "../Services/WalletServices";
import {Cookies} from "react-cookie";
import {navigate} from "@reach/router";

const cookies = new Cookies();

export const logout = () => {
  localStorage.removeItem('user');
  navigate!('/')
};

export const hashPersonalMessage = (msg: string) => {
  const buffer = Buffer.from(msg);
  const result = ethUtil.hashPersonalMessage(buffer);
  return ethUtil.bufferToHex(result);
};

export const handleResponse = async (response: any) => {
  return await response.text().then((text: string) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (401 === response.status || 403 === response.status) {
        // auto logout if 401 or 403 response returned from api, remove localstorage user object.
        logout();
      }
      const error = (data && data.message) || response.toString();
      return Promise.reject(error);
    }
    return data;
  });
};


export const authHeader = () => {
  return {"Content-Type": "application/json",};
};

export const authHeaderWithJson = () => {

  if (!localStorage.getItem('user')) {
    return {};
  }
  const token = JSON.parse(localStorage.getItem('user') + '').token;
  if (!token) return {};

  const header = {
    Authorization: token,
    "Content-Type": "application/json",
  };
  return header;
};

export const checkIsTokenExpired = () => {
  walletService.verifyToken().then(console.log).catch(console.error);
}

export const validate = () => {
  checkIsTokenExpired();
  if (!localStorage.getItem('user')) {
    cookies.remove('provider');
    cookies.remove('account');
  }
}

export const getUserInfo = (): { loginAt: string | undefined, loginCount: number | undefined } => {

  let loginAt = undefined;
  let loginCount = undefined;

  if (!localStorage.getItem('user')) {
    return {loginAt, loginCount};
  }
  const info = JSON.parse(localStorage.getItem('user') + "")
  if (!info) {
    return {loginAt, loginCount};
  }
  const user = info.user;
  if (!user) {
    return {loginAt, loginCount};
  }

  loginAt = user.last_login_time;

  loginCount = user.login_count

  return {loginAt, loginCount};
}
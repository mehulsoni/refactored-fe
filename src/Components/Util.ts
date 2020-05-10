import * as ethUtil from "ethereumjs-util";
import {navigate} from "@reach/router";

export const getUserDetailFromStorage =(item: string): string =>{
  return  <string>localStorage.getItem(item);
};

export const userInfo = JSON.parse(getUserDetailFromStorage("user"));

export const logout = () => {
  localStorage.removeItem('user');
  navigate!('/');
};

export const hashPersonalMessage = (msg: string) => {
  const buffer = Buffer.from(msg);
  const result = ethUtil.hashPersonalMessage(buffer);
  return  ethUtil.bufferToHex(result);
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
  return  {  "Content-Type": "application/json", };
};

export const authHeaderWithJson = () => {
  let headers = {};
  if (userInfo && userInfo.token) {
    headers = {
      Authorization: userInfo.token,
      "Content-Type": "application/json",
    };
  }
  return headers;
};



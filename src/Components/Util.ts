import * as ethUtil from 'ethereumjs-util';
import { navigate } from '@reach/router';

export const userInfo = JSON.parse(localStorage.getItem('user') + '');

export const logout = () => {
    localStorage.removeItem('user');
    navigate!('/login');
};

export const hashPersonalMessage = (msg: string) => {
    const buffer = Buffer.from(msg);
    const result = ethUtil.hashPersonalMessage(buffer);
    const hash = ethUtil.bufferToHex(result);
    return hash;
};

export const handleResponse = (response: any) => {
    return response.text().then((text: string) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (401 === response.status || 403 === response.status) {
                // auto logout if 401 response returned from api
                logout();
            }
            const error = (data && data.message) || response.toString();
            return Promise.reject(error);
        }
        return data;
    });
};

export const authHeader = () => {
    let headers = {};
    if (userInfo && userInfo.token) {
        headers = { Authorization: userInfo.token };
    }
    return headers;
};

export const authHeaderWithJson = () => {
    let headers = {};
    if (userInfo && userInfo.token) {
        headers = { Authorization: userInfo.token, 'Content-Type': 'application/json' };
    }
    return headers;
};

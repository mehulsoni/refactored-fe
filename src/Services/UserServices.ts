import { authHeaderWithJson, handleResponse } from '../Components/Util';

const login = (email: string, password: string) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    };

    return fetch(`/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then((user) => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        })
        .catch(console.error);
};

const register = (user: any) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    };
    return fetch(`/users/register`, requestOptions).then(handleResponse);
};

const getAllByAddress = async (address: string) => {
    const requestOptions = {
        method: 'GET',
        headers: authHeaderWithJson(),
    };
    return await fetch(`/wallets/signedMessages/${address}`, requestOptions).then(handleResponse);
};

const verifyToken = () => {
    const requestOptions = {
        method: 'GET',
        headers: authHeaderWithJson(),
    };
    return fetch(`/verify`, requestOptions).then(handleResponse);
};

export const userService = {
    login,
    register,
    getAllByAddress,
    verifyToken,
};

import {authHeader, authHeaderWithJson, handleResponse} from '../Components/Util';

const validateSignedMessage = (message: any, owner: string, sign: any) => {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({message, owner, sign}),
    };
    return fetch(`/wallets/validate/message`, requestOptions).then(handleResponse);
};

const verifyToken = async () => {
    const requestOptions = {
        method: "GET",
        headers: authHeaderWithJson(),
    };
    return await fetch(`/wallets/verify`, requestOptions).then(handleResponse);
};

export const walletService = {validateSignedMessage, verifyToken};

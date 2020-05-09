import { authHeaderWithJson, handleResponse, logout } from "../Components/Util";

const login = async (email: string, password: string) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  };

  return await fetch(`/users/authenticate`, requestOptions)
    .then(handleResponse)
    .then(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("user", JSON.stringify(user));

      return user;
    })
    .catch(console.error);
};

const register = async (user: any) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  };
  return await fetch(`/users/register`, requestOptions).then(handleResponse);
};

const getAllByAddress = async (address: string) => {
  const requestOptions = {
    method: "GET",
    headers: authHeaderWithJson()
  };
  return await fetch(`/wallets/signed-messages/${address}`, requestOptions).then(
    handleResponse
  );
};

const verifyToken = async () => {
  const requestOptions = {
    method: "GET",
    headers: authHeaderWithJson()
  };
  return await fetch(`/wallets/verify`, requestOptions)
    .then(res => res.json())
    .then(response => {
      if (!response.ok) {
        if (401 === response.status || 403 === response.status) {
          //   logout();
        }
      }
    })
    .catch(console.log);
};

export const userService = {
  login,
  register,
  getAllByAddress,
  verifyToken
};

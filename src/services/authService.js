import { useUser } from "../context/UserProvider";

import http from "./httpService";

const apiEndpoint = "/auth/local";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(identifier, password) {
  const { data: jwt } = await http.post(apiEndpoint, { identifier, password });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  const { currentUser } = useUser();
  try {
    return currentUser;
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};

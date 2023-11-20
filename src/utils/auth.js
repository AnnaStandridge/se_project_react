import { processServerResponse } from "./api";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.wtwr.happyforever.com"
    : "http://localhost:3001";

const createUser = ({ name, avatar, email, password }) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, avatar, password }),
  }).then(processServerResponse);
};

const login = ({ email, password }) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(processServerResponse);
};

const checkToken = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(processServerResponse);
};

const editProfile = ({ name, avatar, _id }) => {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar, _id }),
  }).then(processServerResponse);
};

const auth = { createUser, login, checkToken, editProfile };
export default auth;

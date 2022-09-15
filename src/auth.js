export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
};

// duckAuth.js

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // if (data.jwt) {
      //   localStorage.setItem('jwt', data.jwt);
      //   return data;
      // }
    })
    .catch((err) => console.log(err));
};

// {"data":{"_id":"6322e0f56390a40014698bc1","email":"lukoyanowa.maria@yandex.ru"}}
// {
//   "email": "lukoyanowa.maria@yandex.ru",
//   "password": "12345"
// }

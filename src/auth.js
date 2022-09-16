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
      try {
        if (response.status === 201) {
          return response.json();
        }
      } catch (e) {
        return e;
      }
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
      // console.log(data);
      // console.log(data.jwt);
      // console.log(data.token);
      //Проверяем, есть ли свойство jwt в объекте data, который вернул сервер
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        return data;
        //jwt отсутствует, ничего не вернётся и токена не будет
      } else {
        return;
      }
    })
    .catch((err) => console.log(err));
};

// {"data":{"_id":"6322e0f56390a40014698bc1","email":"lukoyanowa.maria@yandex.ru"}}
// {
//   "email": "lukoyanowa.maria@yandex.ru",
//   "password": "12345"
// }

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data);
};
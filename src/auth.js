export const BASE_URL = 'https://auth.nomoreparties.co';

// const request = ({ url, method = 'POST', token, data }) => {
//   return fetch(`${BASE_URL}${url}`, {
//     method,
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//       ...(!!token && {
//         'Authorization': `Bearer ${token}`,
//       }),
//     },
//     ...(!!data && { body: JSON.stringify({ data }) }),
//   }).then((res) => {
//     if (res.ok) {
//       return res.json();
//     }
//     return Promise.reject(res.status);
//   });
// };

// export const register = (email, password)=>{
//   return request ({
//     url:'/signup',
//     data:{email, password}
//   })
// }

// export const authorize = (email, password)={
//   return request({
//     url:'/signup',
//     data:{email, password}
//   })
// }

// export const getContent = (token) => {
//   return request({
//     url: '/users/me',
//     method: 'GET',
//     token,
//   });
// };

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

const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://api.loveali.students.nomoredomainssbs.ru/'
    : 'http://localhost:3001'

function _handleServerResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error:${res.status}`)
}

function _request(url, options) {
  return fetch(url, options).then((res) => _handleServerResponse(res))
}

export const register = (password, email) => {
  return _request(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  }).then((res) => {
    return res
  })
}

export const authorize = (email, password) => {
  return _request(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then((data) => {
    console.log('singin set jwt: ', data)
    //if token found in db
    if (data.token) {
      localStorage.setItem('jwt', data.token)
      return data
    }
  })
}
export const checkToken = (token) => {
  return _request(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((data) => {
    return data
  })
}

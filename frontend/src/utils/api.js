class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl
  }

  _handleServerResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error:${res.status}`)
  }

  _request(url, options) {
    return fetch(url, options).then((res) => this._handleServerResponse(res))
  }

  getUserInfo(token) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
  }

  setUserInfo({ name, about }, token) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        about,
      }),
    })
  }

  getInitialCards(token) {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
  }

  addCard({ name, link }, token) {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        link,
      }),
    })
  }

  deleteCard(cardId, token) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
  }

  changeLikeCardStatus(cardId, like, token) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: like ? 'PUT' : 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
  }

  setUserAvatar({ avatar }, token) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar,
      }),
    })
  }
}
const api = new Api({
  baseUrl:
    process.env.NODE_ENV === 'production'
      ? 'https://api.loveali.students.nomoredomainssbs.ru'
      : 'http://localhost:3001',
})

export default api

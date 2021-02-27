export const BASE_URL = 'https://api.bewse.mesto.students.nomoredomains.icu';



function handleResponse (res) {
  if (res.ok) {
    return res.json()
  } else {
    return Promise.reject(res)
  }
}

export const register = ({ email, password }) => {
    return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then(res => handleResponse(res))
};

export const login = ({ email, password  }) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then(res => handleResponse(res))
};

export const getEmail = ({ token }) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => handleResponse(res))
  }

export const getUserInfo = ({ token }) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  .then(res => handleResponse(res))
}

export const getInitialCards = ({ token }) => {
    return fetch(`${BASE_URL}/cards`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => handleResponse(res))
  }  

export const editUserInfo = ({ name, about, token }) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ name, about })
    })
      .then(res => handleResponse(res))
  }

export const changeAvatar = ({ avatar, token }) => {
    return fetch(`${BASE_URL}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
        body: JSON.stringify({ avatar })
    })
    .then(res => handleResponse(res))
}

export const addCard = ({ name, link, token }) => {
    return fetch(`${BASE_URL}/cards`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ name, link })
    })
      .then(res => handleResponse(res))
  }

export const deleteCard = ({ token, cardId }) => {
    return fetch(`${BASE_URL}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => handleResponse(res))
  }

export const putLike = ({ cardId, token }) => {
    return fetch(`${BASE_URL}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => handleResponse(res))
  }
  
export const removeLike = ({ cardId, token }) => {
    return fetch(`${BASE_URL}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => handleResponse(res))
  }

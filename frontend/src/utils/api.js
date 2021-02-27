import {config} from './utils.js';

class Api {
    constructor(options) {
        this.url = options.baseUrl;
        this.headers = options.headers;
    }

    _handleResponse(response) {
        if (response.ok) {
          return response.json();
        } else {
            return Promise.reject(`Ошибка: ${response.status}`);
        }
    }

    getUserInfo() {
        return fetch(`${this.url}/users/me`, {
            method: 'GET',
            headers: this.headers
        })
        .then(this._handleResponse);  
    }

    getInitialCards() {
        return fetch(`${this.url}/cards`, {
            method: 'GET',
            headers: this.headers
        })
        .then(this._handleResponse);  
    }

    editUserInfo(name, about) {
        return fetch(`${this.url}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: name,
                about: about
              })
        })
        .then(this._handleResponse);  
    }

    changeAvatar(url) {
        return fetch(`${this.url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: url
                })
        })
        .then(this._handleResponse);  
    }

    addCard(name, link) {
        return fetch(`${this.url}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: name,
                link: link
              })
        })
        .then(this._handleResponse);  
    }

    deleteCard(id) {
        return fetch(`${this.url}/cards/${id}`, {
            method: 'DELETE',
            headers: this.headers,
        })
        .then(this._handleResponse);
    }

    putLike(id) {
        return fetch(`${this.url}/cards/likes/${id}`, {
            method: 'PUT',
            headers: this.headers,
        })
        .then(this._handleResponse);
    }

    removeLike(id) {
        return fetch(`${this.url}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: this.headers,
        })
        .then(this._handleResponse);
    }
}

export const api = new Api(config);

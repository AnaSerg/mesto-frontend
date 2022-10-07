class Api {
    constructor({ baseUrl, headers }, cardId) {
      this._baseUrl = baseUrl;
      this._headers = headers;
      this._cardId = cardId;
    }

    _handleResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._headers,
        })
        .then(this._handleResponse);
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._headers,
        })
        .then(this._handleResponse);
    }

    sendUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about,
            })
        })
        .then(this._handleResponse);
    }

    sendNewCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link,
            })
        })
        .then(this._handleResponse);
    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then(this._handleResponse);
    }

    changeLikeCardStatus(id, isLiked) {
        if(isLiked) {
            return fetch(`${this._baseUrl}/cards/${id}/likes`, {
                method: 'PUT',
                headers: this._headers,
            })
            .then(this._handleResponse);
        } else {
            return fetch(`${this._baseUrl}/cards/${id}/likes`, {
                method: 'DELETE',
                headers: this._headers,
            })
            .then(this._handleResponse);
        }
    }

    sendAvatarInfo(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
        .then(this._handleResponse);
    }
}

export default new Api ({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-49',
    headers: {
      authorization: '2cee6aa2-b4a3-48c5-9c04-a35e285f1434',
      'Content-Type': 'application/json'
    }
})
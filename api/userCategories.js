import client from '../utils/client';

const endpoint = client.databaseURL;

const getUserCategories = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/user-categories.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getUserCategoriesByCategory = (categoryId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/user-categories.json?orderBy="category_id"&equalTo="${categoryId}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const createUserCategory = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/user-categories.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateUserCategory = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/user-categories/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteUserCategory = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/user-categories/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  getUserCategories, getUserCategoriesByCategory, createUserCategory, updateUserCategory, deleteUserCategory
};

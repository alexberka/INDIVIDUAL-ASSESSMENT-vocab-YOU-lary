import client from '../utils/client';

const endpoint = client.databaseURL;

const getAllCategories = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/categories.json`, {
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

const getSingleCategory = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/categories.json?orderBy="uid"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const deleteCategory = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/categories/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export { getAllCategories, getSingleCategory, deleteCategory };

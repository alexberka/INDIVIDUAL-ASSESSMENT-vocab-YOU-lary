import client from '../utils/client';

const endpoint = client.databaseURL;

const getUserTerms = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/terms.json${uid ? `?orderBy="uid"&equalTo="${uid}"` : ''}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
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

const getTerms = async (uid) => {
  const [page, , , searched] = document.body.id.split('..');
  const allTerms = await getUserTerms(page === 'community' || page === 'new-category' ? '' : uid);
  const specTerms = allTerms.filter((term) => term.uid === uid || term.public === 'true');
  if (searched) {
    return specTerms.filter((term) => term.term.toLowerCase().includes(searched)
      || term.definition.toLowerCase().includes(searched));
  // eslint-disable-next-line no-else-return
  } else {
    return specTerms;
  }
};

const getSingleTerm = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/terms/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createTerm = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/terms.json`, {
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

const updateTerm = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/terms/${payload.firebaseKey}.json`, {
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

const deleteTerm = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/terms/${firebaseKey}.json`, {
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
  getUserTerms, getTerms, getSingleTerm, createTerm, updateTerm, deleteTerm
};

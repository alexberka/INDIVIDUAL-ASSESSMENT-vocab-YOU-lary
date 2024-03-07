import { createTerm, getTerms, updateTerm } from '../api/terms';
import showTerms from '../pages/termsDisplay';

const formEvents = (uid) => {
  document.querySelector('#form-container').addEventListener('submit', (e) => {
    e.preventDefault();

    if (e.target.id.includes('create-term')) {
      const payload = {
        term: document.querySelector('#term').value,
        definition: document.querySelector('#definition').value,
        category_id: document.querySelector('#form-category').value,
        public: document.querySelector('#visibility').value,
        created: new Date()
          .toISOString().split('T').join(' ')
          .split('.')[0].concat(' UTC'),
        uid
      };
      console.warn(payload);

      createTerm(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateTerm(patchPayload).then(
          getTerms(uid).then((data) => showTerms(data, uid))
        );
      });
    }

    if (e.target.id.includes('update-term')) {
      const [, firebaseKey] = e.target.id.split('--');

      const patchPayload = {
        term: document.querySelector('#term').value,
        definition: document.querySelector('#definition').value,
        category_id: document.querySelector('#form-category').value,
        public: document.querySelector('#visibility').value,
        created: new Date()
          .toISOString().split('T').join(' ')
          .split('.')[0].concat(' UTC'),
        firebaseKey
      };

      updateTerm(patchPayload).then(
        getTerms(uid).then((data) => showTerms(data, uid))
      );
    }

    if (e.target.id.includes('create-category')) {
      console.warn('Creating term');
    }
  });
};

export default formEvents;

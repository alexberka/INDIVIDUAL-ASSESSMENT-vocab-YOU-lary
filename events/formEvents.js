import { brandNewCategory, getCategories } from '../api/mergedCalls';
import { createTerm, getTerms, updateTerm } from '../api/terms';
import { createUserCategory, updateUserCategory } from '../api/userCategories';
import showCategories from '../pages/categoriesDisplay';
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

      createTerm(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateTerm(patchPayload).then(
          getTerms(uid).then((data) => {
            document.body.id = 'terms..new..all..';
            showTerms(data, uid);
          })
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
        firebaseKey
      };

      updateTerm(patchPayload).then(() => {
        const [a, b] = document.body.id.split('..');
        document.body.id = `${a}..${b}..all..`;
        getTerms(uid).then((data) => {
          showTerms(data, uid);
        });
      });
    }

    if (e.target.id.includes('create-category')) {
      console.warn('Creating category');
      brandNewCategory(uid).then(() => {
        document.body.id = 'categories..az..all..';
        getCategories(uid).then((data) => showCategories(data, uid));
      });
    }
  });

  document.querySelector('#aux-form-container').addEventListener('submit', (e) => {
    e.preventDefault();

    if (e.target.id.includes('select-new-category')) {
      const payload = {
        category_id: document.querySelector('#form-category').value,
        uid
      };

      createUserCategory(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateUserCategory(patchPayload).then(() => {
          document.body.id = 'categories..az..all..';
          getCategories(uid).then((data) => showCategories(data, uid));
        });
      });
    }
  });
};

export default formEvents;

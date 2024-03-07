import { getTerms, deleteTerm, getSingleTerm } from '../api/terms';
import addTermForm from '../components/forms/addTermForm';
import showTerms from '../pages/termsDisplay';
import { unescape } from '../utils/escape';

const domEvents = (uid) => {
  document.querySelector('#button-bar').addEventListener('click', (e) => {
    if (e.target.id.includes('filter-terms-by')) {
      const [, filterBy] = e.target.id.split('--');
      const [a, sortBy] = document.body.id.split('..');
      document.body.id = `${a}..${sortBy}..${filterBy}`;
      getTerms(uid).then((data) => showTerms(data, uid));
    }

    if (e.target.id.includes('sort-terms-by')) {
      const [, sortBy] = e.target.id.split('--');
      const [a, , filterBy] = document.body.id.split('..');
      document.body.id = `${a}..${sortBy}..${filterBy}`;
      getTerms(uid).then((data) => showTerms(data, uid));
    }
  });

  document.querySelector('#display-region').addEventListener('click', (e) => {
    if (e.target.id.includes('edit-term')) {
      const [, firebaseKey] = e.target.id.split('--');
      getSingleTerm(firebaseKey).then((term) => addTermForm(uid, term));
    }

    if (e.target.id.includes('delete-term')) {
      const [, firebaseKey] = e.target.id.split('--');
      const termTitle = document.querySelector(`#term-title-${firebaseKey}`).innerHTML;
      // eslint-disable-next-line no-alert
      if (window.confirm(`Delete \n ${unescape(termTitle)} \nfrom collection?`)) {
        deleteTerm(firebaseKey).then(() => {
          getTerms(uid).then((data) => showTerms(data, uid));
        });
      }
    }

    if (e.target.id.includes('vis-toggle')) {
      console.warn('Changing visibility settings');
    }

    if (e.target.id.includes('copy-to-user')) {
      console.warn('Copying card to user profile');
    }
  });
};

export default domEvents;

import getTerms from '../api/terms';
import showTerms from '../pages/termsDisplay';

const domEvents = (uid) => {
  document.querySelector('#button-bar').addEventListener('click', (e) => {
    if (e.target.id.includes('sort-terms-by')) {
      console.warn('Sorting terms');
    }

    if (e.target.id.includes('filter-terms-by')) {
      const [, category] = e.target.id.split('--');
      const [a, b] = document.body.id.split('..');
      document.body.id = `${a}..${b}..${category}`;
      if (category === 'all') {
        getTerms(uid).then((data) => showTerms(data, uid));
      } else {
        getTerms(uid).then((data) => showTerms(data.filter((t) => t.category_id === category), uid));
      }
    }
  });

  document.querySelector('#display-region').addEventListener('click', (e) => {
    if (e.target.id.includes('edit-term')) {
      console.warn('Editing chosen term');
    }

    if (e.target.id.includes('delete-term')) {
      console.warn('Deleting chosen term');
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

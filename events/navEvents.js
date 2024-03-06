import getTerms from '../api/terms';
import showTerms from '../pages/termsDisplay';

const navEvents = (uid) => {
  document.querySelector('#nav-bar').addEventListener('click', (e) => {
    if (e.target.id.includes('new-term-tab')) {
      console.warn('Switching to new term tab');
    }
    if (e.target.id.includes('terms-tab')) {
      getTerms(uid).then((data) => showTerms(data, uid));
    }
    if (e.target.id.includes('categories-tab')) {
      console.warn('Switching to categories tab');
    }
    if (e.target.id.includes('community-tab')) {
      console.warn('Switching to community tab');
    }
  });
};

export default navEvents;

import { getTerms } from '../api/terms';
import addTermForm from '../components/forms/addTermForm';
import showTerms from '../pages/termsDisplay';

const navEvents = (uid) => {
  document.querySelector('#nav-bar').addEventListener('click', (e) => {
    if (e.target.id.includes('new-term-tab')) {
      addTermForm(uid);
    }
    if (e.target.id.includes('terms-tab')) {
      document.body.id = 'terms..az..all';
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

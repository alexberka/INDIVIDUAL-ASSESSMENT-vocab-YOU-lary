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
      document.querySelector('#search').placeholder = 'Search Terms';
      getTerms(uid).then((data) => showTerms(data, uid));
    }
    if (e.target.id.includes('categories-tab')) {
      console.warn('Switching to categories tab');
    }
    if (e.target.id.includes('community-tab')) {
      document.body.id = 'community..az..all';
      document.querySelector('#search').placeholder = 'Search Community';
      console.warn('Switching to community tab');
    }
  });

  document.querySelector('#search').addEventListener('keyup', (e) => {
    const searched = document.querySelector('#search').value.toLowerCase();

    if (e.keyCode === 13 && searched) {
      const [page] = document.body.id.split('..');
      getTerms(page === 'community' ? '' : uid).then((data) => {
        const found = [];
        data.forEach((term) => {
          if (term.term.toLowerCase().includes(searched) || term.definition.toLowerCase().includes(searched)) {
            found.push(term);
          }
        });
        document.body.id = `${page}..az..all`;
        showTerms(found, uid);
        console.warn(found);
        document.querySelector('#search').value = '';
      });
    }
  });
};

export default navEvents;

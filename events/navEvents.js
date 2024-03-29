import { getCategories } from '../api/mergedCalls';
import { getTerms } from '../api/terms';
import addCategoryForm from '../components/forms/addCategoryForm';
import addTermForm from '../components/forms/addTermForm';
import { navActive } from '../components/shared/navBar';
import showCategories from '../pages/categoriesDisplay';
import showTerms from '../pages/termsDisplay';

const navEvents = (uid) => {
  document.querySelector('#nav-bar').addEventListener('click', (e) => {
    if (e.target.id.includes('terms-tab')) {
      document.body.id = 'terms..az..all..';
      document.querySelector('#search').placeholder = 'Search Terms';
      navActive();
      getTerms(uid).then((data) => showTerms(data, uid));
    }
    if (e.target.id.includes('new-term-tab')) {
      document.body.id = 'new-term..az..all..';
      navActive();
      addTermForm(uid);
    }
    if (e.target.id.includes('categories-tab')) {
      document.body.id = 'categories..az..all..';
      navActive();
      getCategories(uid).then((data) => showCategories(data, uid));
    }
    if (e.target.id.includes('new-category-tab')) {
      document.body.id = 'new-category..az..all..';
      navActive();
      addCategoryForm(uid);
    }
    if (e.target.id.includes('community-tab')) {
      document.body.id = 'community..az..all..';
      navActive();
      getTerms(uid).then((data) => showTerms(data, uid));
    }
  });

  document.querySelector('#search').addEventListener('keyup', (e) => {
    const searched = document.querySelector('#search').value.toLowerCase();

    if (e.keyCode === 13 && searched) {
      const [page] = document.body.id.split('..');
      document.body.id = `${page}..az..all..${searched}`;
      getTerms(uid).then((data) => {
        showTerms(data, uid);
        document.querySelector('#search').value = '';
      });
    }
  });
};

export default navEvents;

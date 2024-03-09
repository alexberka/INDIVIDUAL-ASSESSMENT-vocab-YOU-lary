import { getTerms } from '../api/terms';
import { navActive } from '../components/shared/navBar';
import clearDom from '../utils/clearDom';
import renderToDom from '../utils/renderToDom';
import { azSortCategory, mlSortCategory } from '../utils/sort';

const showCategories = async (categories, uid) => {
  clearDom();
  const [, sortBy] = document.body.id.split('..');

  const sortOptions = [
    { key: 'az', vis: 'A - Z' },
    { key: 'za', vis: 'Z - A' },
    { key: 'most', vis: 'Number of Terms (Most - Least)' },
    { key: 'least', vis: 'Number of Terms (Least - Most)' }
  ];

  let buttonsHTML = `
    <div class="dropdown display-option">
      <button class="btn btn-dark dropdown-toggle" type="button" id="sortByDropdown" data-bs-toggle="dropdown" aria-expanded="false">
        ${sortOptions.find((sort) => sort.key === sortBy).vis}
      </button>
      <ul class="dropdown-menu" aria-labelledby="sortByDropdown">
        <li><a class="dropdown-item disabled"><strong>Sort Method</strong></a></li>
        <li><hr class="dropdown-divider"></li>`;
  sortOptions.forEach((sort) => {
    buttonsHTML += `
      <li>
        <a id="sort-categories-by--${sort.key}" class="dropdown-item" href="#">${sort.vis}</a>
      </li>`;
  });
  buttonsHTML += '</ul></div>';

  const terms = await getTerms(uid);

  const catsWithStats = categories.map((cat) => {
    const count = terms.filter((term) => term.category_id === cat.firebaseKey).length;
    return { ...cat, count };
  });

  if (sortBy === 'az' || sortBy === 'za') {
    catsWithStats.sort(azSortCategory);
    if (sortBy === 'za') { catsWithStats.reverse(); }
  } else if (sortBy === 'most' || sortBy === 'least') {
    catsWithStats.sort(mlSortCategory);
    if (sortBy === 'least') { catsWithStats.reverse(); }
  }

  renderToDom('#button-bar', buttonsHTML);

  if (categories.length) {
    let categoriesHTML = '';
    catsWithStats.forEach((cat) => {
      categoriesHTML += `
        <div class="card" style="width: 18rem;">
          <div class="card-body">
            <h4>${cat.category}</h4>
            <div class="term-footer">
              <p id="view-category--${cat.firebaseKey}" class="clickable">View</p>
              <h6>Terms: ${cat.count}</h6>
              <p id="delete-category--${cat.firebaseKey}" class="clickable">Delete</p>
            </div>
          </div>
        </div>`;
    });
    renderToDom('#display-region', categoriesHTML);
  }
  navActive();
};

export default showCategories;

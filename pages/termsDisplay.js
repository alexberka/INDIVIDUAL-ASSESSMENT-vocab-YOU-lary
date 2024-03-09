import { getAllCategories } from '../api/categories';
import { getCategories } from '../api/mergedCalls';
import clearDom from '../utils/clearDom';
import { escape } from '../utils/escape';
import renderToDom from '../utils/renderToDom';
import { azSortCategory, azSortTerm, dateSortTerm } from '../utils/sort';

const showTerms = async (terms, uid) => {
  clearDom();
  let buttonsHTML = '';
  let termsHTML = '';
  const [page, sortBy, filterBy, searched] = document.body.id.split('..');
  let categories = [];
  if (page === 'community') {
    categories = await getAllCategories();
    categories = categories.filter((cat) => terms.some((term) => cat.firebaseKey === term.category_id));
  } else {
    categories = await getCategories(uid);
  }
  if (searched) {
    buttonsHTML += `
      <div class="display-option">
        <button class="btn btn-danger" type="button" id="search-reset">Results for "${searched}" (Click to Reset)</button>
      </div>`;
  }

  buttonsHTML += `
    <div class="dropdown display-option">
      <button class="btn btn-dark dropdown-toggle" type="button" id="filterByDropdown" data-bs-toggle="dropdown" aria-expanded="false">
        ${filterBy === 'all' ? 'All' : categories.find((cat) => cat.firebaseKey === filterBy).category}
      </button>
      <ul class="dropdown-menu" aria-labelledby="filterByDropdown">
        <li><a class="dropdown-item disabled"><strong>Select Category</strong></a></li>
        <li><hr class="dropdown-divider"></li>
        <li><a id="filter-terms-by--all" class="dropdown-item" href="#">All (default)</a></li>`;
  categories.sort(azSortCategory).forEach((cat) => {
    buttonsHTML += `
      <li>
        <a id="filter-terms-by--${cat.firebaseKey}" class="dropdown-item" href="#">${cat.category}</a>
      </li>`;
  });
  buttonsHTML += '</ul></div>';

  const sortOptions = [
    { key: 'az', vis: 'A - Z' },
    { key: 'za', vis: 'Z - A' },
    { key: 'new', vis: 'Newest First' },
    { key: 'old', vis: 'Oldest First' }
  ];

  buttonsHTML += `
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
        <a id="sort-terms-by--${sort.key}" class="dropdown-item" href="#">${sort.vis}</a>
      </li>`;
  });
  buttonsHTML += '</ul></div>';

  let dispTerms = terms;

  if (filterBy !== 'all') {
    dispTerms = terms.filter((t) => t.category_id === filterBy);
  }

  if (sortBy === 'az' || sortBy === 'za') {
    dispTerms.sort(azSortTerm);
    if (sortBy === 'za') { dispTerms.reverse(); }
  } else if (sortBy === 'new' || sortBy === 'old') {
    dispTerms.sort(dateSortTerm);
    if (sortBy === 'old') { dispTerms.reverse(); }
  }

  if (dispTerms.length) {
    dispTerms.forEach((term) => {
      termsHTML += `
        <div class="card${term.uid === uid ? '' : ' pub-card'}" style="width: 18rem;">
          <div class="card-body">
            <div class="term-data">
              <i ${term.uid === uid ? `id="vis-toggle--${term.public}--${term.firebaseKey}"` : ''} 
                class="${term.uid === uid ? 'clickable mine ' : ''}fas ${term.public === 'true' ? 'fa-globe public-true' : 'fa-lock public-false'}" aria-hidden="true"></i>
              <p>${categories.find((cat) => cat.firebaseKey === term.category_id).category}</p>
            </div>
            <h6>
              <a id="term-title-${term.firebaseKey}" class="term-name" type="button" data-bs-toggle="collapse" data-bs-target="#${term.firebaseKey}-collapse" aria-expanded="false" aria-controls="collapseExample">
                ${escape(term.term)}
              </a>
            </h6>
            <div class="collapse" id="${term.firebaseKey}-collapse">
              <div class="card card-body">
                ${escape(term.definition)}
              </div>
            </div>
            <div class="term-footer">
              ${term.uid !== uid ? `<p id="copy-to-user--${term.firebaseKey}" class="clickable to-collection">Copy To Collection</p>` : `<p id="edit-term--${term.firebaseKey}" class="clickable">Edit</p><p id="delete-term--${term.firebaseKey}" class="clickable">Delete</p>`}
              <p class="timestamp">Created: ${term.created}</p>
            </div>
          </div>
        </div>`;
    });
  }

  renderToDom('#button-bar', buttonsHTML);
  renderToDom('#display-region', termsHTML);
};

export default showTerms;

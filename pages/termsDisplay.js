import { getCategories } from '../api/categories';
import { escape } from '../utils/escape';
import renderToDom from '../utils/renderToDom';

const showTerms = async (terms, uid) => {
  let termsHTML = '';
  const categories = await getCategories();
  const [, sortBy, filterBy] = document.body.id.split('..');

  let buttonsHTML = `
    <div class="dropdown">
      <button class="btn ${filterBy === 'all' ? 'btn-outline-dark' : 'btn-dark'} dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        ${filterBy === 'all' ? 'Filter By' : categories.find((cat) => cat.firebaseKey === filterBy).category}
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li><a id="filter-terms-by--all" class="dropdown-item" href="#">All</a></li>`;
  categories.forEach((cat) => {
    buttonsHTML += `<li><a id="filter-terms-by--${cat.firebaseKey}" class="dropdown-item" href="#">${cat.category}</a></li>`;
  });
  buttonsHTML += '</ul></div>';

  let dispTerms = terms;

  if (filterBy !== 'all') {
    dispTerms = terms.filter((t) => t.category_id === filterBy);
  }

  if (sortBy === 'az' || sortBy === 'za') {
    dispTerms.sort((a, b) => {
      const first = a.term.replace(/\W/g, '').toUpperCase();
      const second = b.term.replace(/\W/g, '').toUpperCase();
      if (first >= second) {
        return 1;
      // eslint-disable-next-line no-else-return
      } else {
        return -1;
      }
    });
    if (sortBy === 'za') { dispTerms.reverse(); }
  }

  if (dispTerms.length) {
    dispTerms.forEach((term) => {
      termsHTML += `
        <div class="card" style="width: 18rem;">
          <div class="card-body">
            <div class="term-data">
              <i id="vis-toggle--${term.firebaseKey}" class="clickable public fas ${term.public ? 'fa-globe' : 'fa-lock'}" aria-hidden="true"></i>
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
              ${term.uid !== uid ? `<p id="copy-to-user--${term.firebaseKey}" class="clickable">Copy To Collection</p>` : `<p id="edit-term--${term.firebaseKey}" class="clickable">Edit</p><p id="delete-term--${term.firebaseKey}" class="clickable">Delete</p>`}
              <p class="timestamp">Created on: ${term.created}</p>
            </div>
          </div>
        </div>`;
    });
  }

  renderToDom('#button-bar', buttonsHTML);
  renderToDom('#display-region', termsHTML);
};

export default showTerms;

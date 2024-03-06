import { getCategories } from '../api/categories';
import escape from '../utils/escape';
import renderToDom from '../utils/renderToDom';

const showTerms = async (terms, uid) => {
  let termsHTML = '';
  const categories = await getCategories();
  if (terms.length) {
    terms.forEach((term) => {
      termsHTML += `
        <div class="card" style="width: 18rem;">
          <div class="card-body">
            <div class="term-data">
              <i id="vis-toggle--${term.firebaseKey}" class="clickable public fas ${term.public ? 'fa-globe' : 'fa-lock'}" aria-hidden="true"></i>
              <p>${categories.find((cat) => cat.firebaseKey === term.category_id).category}</p>
            </div>
            <h6>
              <a class="term-name" type="button" data-bs-toggle="collapse" data-bs-target="#${term.firebaseKey}-collapse" aria-expanded="false" aria-controls="collapseExample">
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

  renderToDom('#display-region', termsHTML);
};

export default showTerms;

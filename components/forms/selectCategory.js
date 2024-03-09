import { getCategories, getUnaddedCategories } from '../../api/mergedCalls';
import renderToDom from '../../utils/renderToDom';
import { azSortCategory } from '../../utils/sort';

const selectCategory = (uid, categoryId) => {
  let optionsHTML = '';
  getCategories(uid).then((cats) => {
    cats.sort(azSortCategory).forEach((cat) => {
      optionsHTML += `
        <option class="list-group-item list-group-item-light" 
          value="${cat.firebaseKey}" ${cat.firebaseKey === categoryId ? 'selected' : ''}>
          ${cat.category}
        </option>`;
    });
    renderToDom('#form-category', optionsHTML);
  });
};

const selectCommunityCategory = (uid) => {
  getUnaddedCategories(uid).then((cats) => {
    if (cats.length) {
      let optionsHTML = '';
      cats.sort(azSortCategory).forEach((cat) => {
        optionsHTML += `
          <option class="list-group-item list-group-item-light" 
            value="${cat.firebaseKey}">
            ${cat.category}
          </option>`;
      });
      const auxFormHTML = `
        <form id="select-new-category" class="add-category">
          <div class="mb-3">
            <p>OR</p>
            <label for="form-category" class="form-label">Select Category From Community:&ensp;</label>
            <select class="btn btn-warning dropdown-toggle" type="dropdown" id="form-category" required>
              ${optionsHTML}
            </select>
          </div>
          <button type="submit" class="btn btn-info">Add to Collection</button>
        </form>`;
      renderToDom('#aux-form-container', auxFormHTML);
    }
  });
};

export { selectCategory, selectCommunityCategory };

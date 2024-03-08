import getCategories from '../../api/mergedCalls';
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

export default selectCategory;

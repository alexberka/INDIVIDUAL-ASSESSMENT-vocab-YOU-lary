import { getCategories } from '../../api/categories';
import renderToDom from '../../utils/renderToDom';
import { azSortCategory } from '../../utils/sort';

const selectCategory = (uid, categoryId) => {
  let optionsHTML = '';
  getCategories().then((cats) => {
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

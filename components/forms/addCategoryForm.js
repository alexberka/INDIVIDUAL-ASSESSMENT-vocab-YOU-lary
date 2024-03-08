import clearDom from '../../utils/clearDom';
import renderToDom from '../../utils/renderToDom';
import { selectCommunityCategory } from './selectCategory';

const addCategoryForm = (uid) => {
  clearDom();
  const formHTML = `
    <form id="create-category" class="add-category">
      <div class="mb-3">
        <label for="term" class="form-label">Enter Category Name</label>
        <input type="text" class="form-control" id="category" aria-describedby="categoryHelp" required>
      </div>
      <button type="submit" class="btn btn-success">Submit</button>
    </form>`;
  renderToDom('#form-container', formHTML);
  selectCommunityCategory(uid);
};

export default addCategoryForm;

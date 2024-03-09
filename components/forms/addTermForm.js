import clearDom from '../../utils/clearDom';
import renderToDom from '../../utils/renderToDom';
import { selectCategory } from './selectCategory';

const addTermForm = (uid, term = {}) => {
  clearDom();
  const formHTML = `
    <form id="${term.firebaseKey ? `update-term--${term.firebaseKey}` : 'create-term'}" class="add-term">
      <div class="mb-3">
        <label for="term" class="form-label">Term</label>
        <input type="text" class="form-control" id="term" aria-describedby="emailHelp" value='${term.term || ''}' required>
      </div>
      <div class="mb-3">
        <label for="definition" class="form-label">Definition</label>
        <textarea class="form-control" id="definition" required>${term.definition || ''}</textarea>
      </div>
      <select class="btn btn-warning dropdown-toggle" type="dropdown" id="form-category" required>
      </select>
      <select class="btn btn-dark dropdown-toggle" type="dropdown" id="visibility" required>
        <option ${term.public === 'true' ? 'value="true" selected ><i class="fas fa-globe" aria-hidden="true"></i>Public' : 'value="false" selected><i class="fas fa-lock" aria-hidden="true"></i>Private'}</option>
        <option ${term.public === 'false' ? 'value="false">Private' : 'value="true">Public'}</option>
      </select>
      <button type="submit" class="btn btn-success">Submit</button>
    </form>`;
  renderToDom('#form-container', formHTML);
  selectCategory(uid, `${term.category_id || ''}`);
};

export default addTermForm;

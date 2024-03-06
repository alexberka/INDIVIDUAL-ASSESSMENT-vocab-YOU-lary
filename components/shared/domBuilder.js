import renderToDom from '../../utils/renderToDom';

const domBuilder = () => {
  const domHTML = `
    <div id="nav-bar"></div>
    <div id="main-container">
      <div id="button-bar"></div>
      <div id="display-region"></div>
      <div id="form-container"></div>
    </div>`;

  renderToDom('#app', domHTML);
};

export default domBuilder;

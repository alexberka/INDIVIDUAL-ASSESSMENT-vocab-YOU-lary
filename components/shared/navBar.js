import renderToDom from '../../utils/renderToDom';

const navBar = () => {
  const domString = `
    <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand title" href="#">POLYGLOT PLAYGROUND</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a id="terms-tab" class="nav-link active" aria-current="page" href="#">Terms</a>
            </li>
            <li class="nav-item">
              <a id="new-term-tab" class="nav-link" href="#">Add Term</a>
            </li>
            <li class="nav-item">
              <a id="categories-tab" class="nav-link" href="#">Categories</a>
            </li>
            <li class="nav-item">
              <a id="new-category-tab" class="nav-link" href="#">Add Category</a>
            </li>
            <li class="nav-item">
              <a id="community-tab" class="nav-link" href="#">Community</a>
            </li>
          </ul>
          <span class="navbar-text">
            <input
              class="form-control mr-sm-2"
              id="search"
              placeholder="Search Terms"
              aria-label="Search"
            />
            <div id="logout-button"></div>
          </span>
        </div>
        </div>
      </nav>`;

  renderToDom('#nav-bar', domString);
};

const navActive = () => {
  const [view] = document.body.id.split('..');
  const tabs = ['terms', 'new-term', 'categories', 'new-category', 'community'];
  tabs.forEach((tab) => {
    if (tab === view) {
      document.querySelector(`#${tab}-tab`).className = 'nav-link active';
      document.querySelector(`#${tab}-tab`).setAttribute('aria-current', 'true');
    } else {
      document.querySelector(`#${tab}-tab`).className = 'nav-link';
      document.querySelector(`#${tab}-tab`).setAttribute('aria-current', 'false');
    }
  });
  if (view === 'community') {
    document.querySelector('#search').placeholder = 'Search Community';
  } else {
    document.querySelector('#search').placeholder = 'Search Terms';
  }
};

export { navBar, navActive };

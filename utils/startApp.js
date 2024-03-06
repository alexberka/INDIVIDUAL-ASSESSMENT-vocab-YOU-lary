import getTerms from '../api/terms';
import logoutButton from '../components/buttons/logoutButton';
import domBuilder from '../components/shared/domBuilder';
import navBar from '../components/shared/navBar';
import domEvents from '../events/domEvents';
import formEvents from '../events/formEvents';
import navEvents from '../events/navEvents';
import showTerms from '../pages/termsDisplay';

const startApp = (uid) => {
  domBuilder();
  navBar();
  domEvents(uid);
  formEvents(uid);
  navEvents(uid);
  logoutButton();

  getTerms(uid).then((data) => showTerms(data, uid));
};

export default startApp;

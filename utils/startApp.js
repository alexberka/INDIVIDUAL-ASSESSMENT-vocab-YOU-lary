import logoutButton from '../components/buttons/logoutButton';
import domBuilder from '../components/shared/domBuilder';
import navBar from '../components/shared/navBar';
import domEvents from '../events/domEvents';
import formEvents from '../events/formEvents';
import navEvents from '../events/navEvents';

const startApp = () => {
  domBuilder();
  navBar();
  domEvents();
  formEvents();
  navEvents();
  logoutButton();
};

export default startApp;

import { signIn } from '../../utils/auth';

// GOOGLE LOGIN BUTTON
const loginButton = () => {
  const domString = `
    <div class="welcome">
      <h4>Bienvenue à</h4>
      <h1 class="welcome-logo">POLYGLOT PLAYGROUND</h1>
      <button id="google-auth" class="btn btn-outline-warning">LOGIN</button>
    </div>`;
  document.querySelector('#app').innerHTML = domString;
  document.querySelector('#google-auth').addEventListener('click', signIn);
};

export default loginButton;

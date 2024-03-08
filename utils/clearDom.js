const clearDom = () => {
  document.querySelector('#button-bar').innerHTML = '';
  document.querySelector('#display-region').innerHTML = '';
  document.querySelector('#form-container').innerHTML = '';
  document.querySelector('#aux-form-container').innerHTML = '';
};

export default clearDom;

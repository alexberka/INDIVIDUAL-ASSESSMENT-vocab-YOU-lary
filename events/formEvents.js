const formEvents = () => {
  document.querySelector('#form-container').addEventListener('submit', (e) => {
    if (e.target.id.includes('create-term')) {
      console.warn('Creating term');
    }
    if (e.target.id.includes('create-category')) {
      console.warn('Creating term');
    }
  });
};

export default formEvents;

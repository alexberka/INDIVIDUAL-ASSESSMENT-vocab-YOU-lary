const renderToDom = (div, HTML) => {
  const targetDiv = document.querySelector(div);
  targetDiv.innerHTML = HTML;
};

export default renderToDom;

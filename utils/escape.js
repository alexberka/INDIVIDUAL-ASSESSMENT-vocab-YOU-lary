const escape = (str) => str
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/\[/g, '&#91')
  .replace(/\]/g, '&#93');

export default escape;

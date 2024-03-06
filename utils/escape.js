const escape = (str) => str
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/\[/g, '&#91')
  .replace(/\]/g, '&#93');

const unescape = (str) => str
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&#91/g, '[')
  .replace(/&#93/g, ']');

export { escape, unescape };

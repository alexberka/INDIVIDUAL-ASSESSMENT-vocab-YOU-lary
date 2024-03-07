const azSortTerm = (a, b) => {
  const first = a.term.replace(/\W/g, '').toUpperCase();
  const second = b.term.replace(/\W/g, '').toUpperCase();
  if (first >= second) {
    return 1;
  // eslint-disable-next-line no-else-return
  } else {
    return -1;
  }
};

const dateSortTerm = (a, b) => {
  const first = Number(a.created.replace(/\D/g, ''));
  const second = Number(b.created.replace(/\D/g, ''));
  return second - first;
};

const azSortCategory = (a, b) => {
  const first = a.category.replace(/\W/g, '').toUpperCase();
  const second = b.category.replace(/\W/g, '').toUpperCase();
  if (first >= second) {
    return 1;
  // eslint-disable-next-line no-else-return
  } else {
    return -1;
  }
};

export { azSortTerm, dateSortTerm, azSortCategory };

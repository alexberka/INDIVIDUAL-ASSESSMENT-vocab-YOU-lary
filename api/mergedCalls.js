import { getAllCategories } from './categories';
import getUserCategories from './userCategories';

const getCategories = async (uid) => {
  const allCategories = await getAllCategories();
  const userCategories = await getUserCategories(uid);
  const categories = allCategories.filter((cat) => userCategories.some((uc) => uc.category_id === cat.firebaseKey));
  return categories;
};

export default getCategories;

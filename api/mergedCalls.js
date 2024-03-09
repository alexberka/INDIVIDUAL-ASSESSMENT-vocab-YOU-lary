import {
  createCategory, deleteCategory, getAllCategories, updateCategory
} from './categories';
import { deleteTerm, getTerms } from './terms';
import {
  createUserCategory, deleteUserCategory, getUserCategories, getUserCategoriesByCategory, updateUserCategory
} from './userCategories';

const getCategories = async (uid) => {
  const allCategories = await getAllCategories();
  const userCategories = await getUserCategories(uid);
  const categories = allCategories.filter((cat) => userCategories.some((uc) => uc.category_id === cat.firebaseKey));
  return categories;
};

const getUnusedCommunityCategories = async (uid) => {
  // Retrieve all categories from firebase
  const allCategories = await getAllCategories();
  // Retrieve all community terms in firebase
  const allTerms = await getTerms(uid);
  // Remove terms in user's collection
  console.warn(allTerms, 'all');
  const communityTerms = allTerms.filter((term) => term.uid !== uid);
  console.warn(communityTerms, 'gUCC');
  // Filter all categories to only include categories used by public, non user terms
  const communityCategories = allCategories.filter((cat) => communityTerms.some((t) => t.category_id === cat.firebaseKey));
  // Get user-specific user-categories
  const userCategories = await getUserCategories(uid);
  // Retrieve category info for user-categories
  const categories = allCategories.filter((cat) => userCategories.some((uc) => uc.category_id === cat.firebaseKey));
  // Filter categories used by public, non-user terms to exclude categories already in user's collection
  const unusedCommunityCategories = communityCategories.filter((cc) => !categories.some((bb) => bb.category === cc.category));

  return unusedCommunityCategories;
};

const deleteFullCategory = async (categoryFirebaseKey, uid) => {
  const userCategoriesMatched = await getUserCategoriesByCategory(categoryFirebaseKey);
  userCategoriesMatched.filter((ucm) => ucm.uid === uid).forEach((ucm) => deleteUserCategory(ucm.firebaseKey));
  // Get all user terms
  const userTerms = await getTerms(uid);
  // Delete terms in category
  userTerms.filter((term) => term.category_id === categoryFirebaseKey).forEach((term) => deleteTerm(term.firebaseKey));
  // Check for remaining users with category
  const otherUCM = userCategoriesMatched.filter((ucm) => ucm.uid !== uid);
  // If no other users are still using category, remove from database
  if (!otherUCM.length) {
    deleteCategory(categoryFirebaseKey);
  }
};

const brandNewCategory = async (uid) => {
  const catPayload = { category: document.querySelector('#new-category').value };
  // Add new category
  const fbObj = await createCategory(catPayload);
  // Update category with firebaseKey
  const catPatchPayload = { firebaseKey: fbObj.name };
  await updateCategory(catPatchPayload);
  // Add new user category
  const uCatPayload = { category_id: fbObj.name, uid };
  const uFbObj = await createUserCategory(uCatPayload);
  // Update user category with firebaseKey
  const uCatPatchPayload = { firebaseKey: uFbObj.name };
  await updateUserCategory(uCatPatchPayload);
};

export {
  getCategories, getUnusedCommunityCategories, deleteFullCategory, brandNewCategory
};

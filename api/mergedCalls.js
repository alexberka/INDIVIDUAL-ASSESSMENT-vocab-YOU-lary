import {
  createCategory, deleteCategory, getAllCategories, updateCategory
} from './categories';
import {
  createTerm, deleteTerm, getSingleTerm, getTerms, updateTerm
} from './terms';
import {
  createUserCategory, deleteUserCategory, getUserCategories, getUserCategoriesByCategory, updateUserCategory
} from './userCategories';

const getCategories = async (uid) => {
  const allCategories = await getAllCategories();
  const userCategories = await getUserCategories(uid);
  const categories = allCategories.filter((cat) => userCategories.some((uc) => uc.category_id === cat.firebaseKey));
  return categories;
};

const getUnaddedCategories = async (uid) => {
  // Retrieve all categories from firebase
  const allCategories = await getAllCategories();
  // Get user-specific user-categories
  const userCategories = await getUserCategories(uid);
  // Retrieve category info for unadded categories
  const unaddedCategories = allCategories.filter((cat) => !userCategories.some((uc) => uc.category_id === cat.firebaseKey));
  return unaddedCategories;
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

const copyToUser = async (termFirebaseKey, uid) => {
  // Get term to be copied
  const copyPayload = await getSingleTerm(termFirebaseKey);
  // Update timestamp, set privacy to 'private' and overwrite with user's uid
  copyPayload.created = new Date()
    .toISOString().split('T').join(' ')
    .split('.')[0].concat(' UTC');
  copyPayload.public = 'false';
  copyPayload.uid = uid;
  // Create copied term
  const tFbObj = await createTerm(copyPayload);
  // Replace firebaseKey with new
  const termPatchPayload = { firebaseKey: tFbObj.name };
  await updateTerm(termPatchPayload);
  // Check if user already has category
  const currUserCats = await getUserCategories(uid);
  // If not, add to user's categories
  if (!currUserCats.find((cat) => cat.category_id === copyPayload.category_id)) {
    // Create User Category object
    const uCatPayload = { category_id: copyPayload.category_id, uid };
    // Post to firebase, capturing response
    const fbObj = await createUserCategory(uCatPayload);
    // Append new firebase key and update
    const uCatPatchPayload = { firebaseKey: fbObj.name };
    await updateUserCategory(uCatPatchPayload);
  }
};

export {
  getCategories, getUnaddedCategories, deleteFullCategory, brandNewCategory, copyToUser
};

const db = require('./firebaseConfig');
const admin = require('firebase-admin');

const getUserIdByEmail = async (email) => {
  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    return userRecord.uid;
  } catch (error) {
    console.error('Error fetching user data: ', error);
    throw new Error('Error fetching user data');
  }
};

const deleteByQuery = async (email, collectionName, queryFields) => {
  if (!email || !collectionName || !queryFields) {
    throw new Error('Email, collectionName, and queryFields are required');
  }

  try {
    const userId = await getUserIdByEmail(email);
    let collectionRef = db.collection(collectionName);

    queryFields.forEach(field => {
      collectionRef = collectionRef.where(field.key, '==', field.value === 'userId' ? userId : field.value);
    });

    const querySnapshot = await collectionRef.get();

    if (querySnapshot.empty) {
      return { message: 'No matching documents found' };
    }

    const deletePromises = querySnapshot.docs.map(doc => doc.ref.delete());
    await Promise.all(deletePromises);

    return { message: 'Document(s) successfully deleted' };
  } catch (error) {
    console.error('Error deleting document: ', error);
    throw new Error('Error deleting document');
  }
};

const deleteAllDocuments = async (email, collectionName) => {
  if (!email || !collectionName) {
    throw new Error('Email and collectionName are required');
  }

  try {
    const userId = await getUserIdByEmail(email);
    const collectionRef = db.collection(collectionName).where('userId', '==', userId);
    const querySnapshot = await collectionRef.get();

    if (querySnapshot.empty) {
      return { message: 'No matching documents found' };
    }

    const deletePromises = querySnapshot.docs.map(doc => doc.ref.delete());
    await Promise.all(deletePromises);

    return { message: 'All user documents successfully deleted' };
  } catch (error) {
    console.error('Error deleting documents: ', error);
    throw new Error('Error deleting documents');
  }
};

module.exports = {
  deleteByQuery,
  deleteAllDocuments
};

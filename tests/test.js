const { deleteByQuery, deleteAllDocuments } = require('../src');

const run = async () => {
  try {
    // Example to delete by flexible query
    const resultByQuery = await deleteByQuery('user@example.com', 'notes', [
      { key: 'title', value: 'Some Title' },
      { key: 'userId', value: 'userId' }
    ]);
    console.log(resultByQuery);

    // Example to delete all documents
    const resultAllDocuments = await deleteAllDocuments('user@example.com', 'notes');
    console.log(resultAllDocuments);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

run();

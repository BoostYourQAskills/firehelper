<p align="center">
  <img src=".github/logo.png" alt="Logo" width="250px" />
</p>

# Firehelper

A Node.js package designed for software testing, enabling the deletion of documents in Firestore based on flexible queries.

## Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/firehelper.git
cd firehelper

npm install
```

## Configuration

### Step 1: Set Up Firebase

1. Go to the Firebase Console.
2. Click on your project (or create a new project if you don't have one).
3. Navigate to the **Project Settings** by clicking the gear icon.
4. Under the **Service Accounts** tab, click on **Generate New Private Key**. This will download a JSON file to your computer. Save this file as `serviceAccountKey.json`.

### Step 2: Add `serviceAccountKey.json` to Your Project

1. Move the downloaded `serviceAccountKey.json` file to the `src` directory of your project.

### Step 3: Update `firebaseConfig.js`

Make sure your `firebaseConfig.js` points to the correct location of the `serviceAccountKey.json` file:

```javascript
const admin = require('firebase-admin');
const path = require('path');

const serviceAccount = require(path.join(__dirname, 'serviceAccountKey.json'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = db;
```

## Usage

You can use the package to delete documents in Firestore based on flexible queries.

### Example Usage

```javascript
const { deleteByQuery, deleteAllDocuments } = require('./src/index');

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
```

### Functions

#### `deleteByQuery(email, collectionName, queryFields)`

Deletes documents based on a flexible query.

- `email`: The user's email address.
- `collectionName`: The name of the collection in Firestore.
- `queryFields`: An array of query field objects. Each object should have a `key` and `value`. If `value` is `'userId'`, it will be replaced with the user's ID.

#### `deleteAllDocuments(email, collectionName)`

Deletes all documents for a user in a specified collection.

- `email`: The user's email address.
- `collectionName`: The name of the collection in Firestore.

## License

This project is licensed under the MIT License.

## Contact

Rocketskills - [Github](https://github.com/RocketskilslHQ) - **[rocketskills@proton.me](mailto:rocketskills@proton.me)**
const admin = require('firebase-admin');
const users = require('../.users.json');

// Initialise Firebase
admin.initializeApp(); // Needs GOOGLE_APPLICATION_CREDENTIALS environment variable set to the path of the service account key file
const auth = admin.auth();

// Load users and create them
for (const user of users) {
  createUser(user);
}

async function createUser(data) {
  const userRecord = await auth.createUser({
    email: data.email,
    password: data.password,
    displayName: data.name
  });
  await auth.setCustomUserClaims(userRecord.uid, { roles: data.roles });
  console.log('Successfully created new user:', userRecord.email, data.roles);
}

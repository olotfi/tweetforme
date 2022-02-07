const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const users = require('./.users.json');

// Initialise Firebase
initializeApp({
  credential: applicationDefault() // Needs GOOGLE_APPLICATION_CREDENTIALS env var set to the service account key JSON file
});

// Load users and create them
for (const user of users) {
  createUser(user);
}

async function createUser(data) {
  const auth = getAuth();
  const userRecord = await auth.createUser({
    email: data.email,
    password: data.password,
    displayName: data.name
  });
  await auth.setCustomUserClaims(userRecord.uid, { roles: data.roles });
  console.log('Successfully created new user:', userRecord.uid, userRecord.email);
}

// Twitter OAuth1.0a Flow - no need to deploy/reuse as tokens are presistent
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const TwitterApi = require('twitter-api-v2').default;

admin.initializeApp();
const APP_KEY = functions.config().twitter.app_key;
const APP_SECRET = functions.config().twitter.app_secret;
const dbRef = admin.firestore().doc('tokens/twitter');
const callbackUrl = 'http://127.0.0.1:5001/tweetforme-c9003/us-central1/callback';

// Step 1: Authorise the app to access the user's Twitter account
exports.twitterAuth = functions.https.onRequest(async (request, response) => {
  const client = new TwitterApi({
    appKey: APP_KEY,
    appSecret: APP_SECRET
  });

  const { url, oauth_token, oauth_token_secret } = await client.generateAuthLink(callbackUrl, {
    authAccessType: 'write'
  });
  await dbRef.set({ oauth_token, oauth_token_secret });
  response.redirect(url);
});

// Step 2: Handle the callback from Twitter and store access tokens in Firestore
exports.twitterCallback = functions.https.onRequest(async (request, response) => {
  const { oauth_token, oauth_verifier } = request.query;
  const storedTokens = (await dbRef.get()).data();

  if (oauth_token !== storedTokens.oauth_token || !oauth_verifier) {
    response.status(400).send('Invalid request');
  }

  const client = new TwitterApi({
    appKey: APP_KEY,
    appSecret: APP_SECRET,
    accessToken: oauth_token,
    accessSecret: storedTokens.oauth_token_secret
  });

  try {
    const { client: loggedClient, accessToken, accessSecret } = await client.login(oauth_verifier);
    await dbRef.update({ accessToken, accessSecret });
    const currentUser = await loggedClient.getCurrentUserV2();
    response.send(currentUser);
  } catch (error) {
    console.error(error);
    response.status(500).send(error);
  }
});

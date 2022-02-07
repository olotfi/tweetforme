const functions = require('firebase-functions');
const admin = require('firebase-admin');
const TwitterApi = require('twitter-api-v2').default;

admin.initializeApp();
const APP_KEY = functions.config().twitter.app_key;
const APP_SECRET = functions.config().twitter.app_secret;

exports.tweetOnApproval = functions.firestore
  .document('tweets/{tweetId}')
  .onUpdate(async (change) => {
    // Continue only if status changed to 'approved' from 'submitted'
    if (change.before.data().status === 'submitted' && change.after.data().status === 'approved') {
      // Get the user's Twitter access tokens from Firestore
      const { accessToken, accessSecret } = (
        await admin.firestore().doc('tokens/twitter').get()
      ).data();

      // Init Twitter client and publish tweet
      const twitter = new TwitterApi({
        appKey: APP_KEY,
        appSecret: APP_SECRET,
        accessToken: accessToken,
        accessSecret: accessSecret
      });
      try {
        const { data: tweet } = await twitter.v2.tweet(change.after.data().content);
        // Update the tweet's Firestore document with the tweet's ID
        await change.after.ref.update({
          tweetId: tweet.id
        });
      } catch (error) {
        console.error(error);
      }
    }
  });

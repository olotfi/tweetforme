import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  Timestamp,
  where
} from 'firebase/firestore';
import { db } from './firebase';
import { Tweet, TweetStatus } from './Tweet';

const TWEETS_COLLECTION = 'tweets';
const tweetsRef = collection(db, TWEETS_COLLECTION);

// Represents a doc payload in the Tweets collection in Firestore
interface TweetDoc {
  content: string;
  uid: string;
  status: TweetStatus;
  created: Timestamp;
}

// Creates the tweets and returns its full data (including its ID and created timestamp)
export async function createTweet(content: string, uid: string): Promise<Tweet> {
  const created = new Date();
  const tweetDoc = await addDoc(tweetsRef, {
    content,
    status: TweetStatus.SUBMITTED,
    uid,
    created: Timestamp.fromDate(created)
  });
  return {
    id: tweetDoc.id,
    content,
    uid,
    status: TweetStatus.SUBMITTED,
    created
  };
}

// Gets the 10 (or specified limit) most recent tweets submitted by the specified user
// NOTE: I assumed that users can only see the tweets they submitted
export async function getRecentTweets(uid: string, limitTweets: number = 10): Promise<Tweet[]> {
  const q = query(
    tweetsRef,
    where('uid', '==', uid),
    orderBy('created', 'desc'),
    limit(limitTweets)
  );
  const querySnaps = await getDocs(q);
  return querySnaps.docs.map((doc) => {
    const data = doc.data() as TweetDoc;
    return {
      id: doc.id,
      content: data.content,
      status: data.status,
      uid: data.uid,
      created: data.created.toDate()
    };
  });
}

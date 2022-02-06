import React, { useEffect, useState } from 'react';
import { Page } from '../../components/Page';
import { AppHeader } from '../../components/AppHeader';
import { Footer } from '../../components/Footer';
import { Box, Container } from '@chakra-ui/react';
import { NewTweetForm } from './components/NewTweetForm';
import { TweetsList } from './components/TweetsList';
import { Tweet } from '../../lib/Tweet';
import { getRecentTweets } from '../../lib/tweets';
import { useCurrentUser } from '../../context/auth';

export const Dashboard = () => {
  const { currentUser } = useCurrentUser();
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addTweet = (newTweet: Tweet) => setTweets([newTweet, ...tweets]);

  useEffect(() => {
    setIsLoading(true);
    getRecentTweets(currentUser!.uid).then((tweets) => {
      setTweets(tweets);
      setIsLoading(false);
    });
  }, [currentUser]);

  return (
    <Page title="TweetForMe | Dashboard">
      <Box py="32px">
        <AppHeader />
      </Box>
      <Container maxWidth="520px" mb="48px">
        <Box my="48px">
          <NewTweetForm addTweet={addTweet} />
        </Box>
        <Box>
          <TweetsList tweets={tweets} isLoading={isLoading} />
        </Box>
      </Container>
      <Footer />
    </Page>
  );
};

import React from 'react';
import { Page } from '../../components/Page';
import { AppHeader } from '../../components/AppHeader';
import { Footer } from '../../components/Footer';
import { Box, Container } from '@chakra-ui/react';
import { NewTweetForm } from './components/NewTweetForm';
import { TweetsList } from './components/TweetsList';

export const Dashboard = () => {
  return (
    <Page title="TweetForMe | Dashboard">
      <Box py="32px">
        <AppHeader />
      </Box>
      <Container maxWidth="520px" mb="72px">
        <Box my="48px">
          <NewTweetForm />
        </Box>
        <Box>
          <TweetsList />
        </Box>
      </Container>
      <Footer />
    </Page>
  );
};

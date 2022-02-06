import React from 'react';
import { Page } from '../components/Page';
import { AppHeader } from '../components/AppHeader';
import { Footer } from '../components/Footer';

export const Dashboard = () => {
  return (
    <Page title="TweetForMe | Dashboard" py="32px">
      <AppHeader />

      <Footer />
    </Page>
  );
};

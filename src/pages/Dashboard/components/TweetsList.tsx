import React from 'react';
import { VStack } from '@chakra-ui/react';
import { Tweet } from './Tweet';

// Load tweets from Firestore using React Query

export const TweetsList = () => {
  return (
    <VStack spacing="32px">
      <Tweet id="test" content="Hello world!" status="submitted" createdAt="2020-01-01" />
    </VStack>
  );
};

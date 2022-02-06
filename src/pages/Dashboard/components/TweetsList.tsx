import React from 'react';
import { Center, Spinner, VStack } from '@chakra-ui/react';
import { Tweet } from '../../../lib/Tweet';
import { TweetView } from './TweetView';

export type TweetsListProps = {
  tweets: Tweet[];
  isLoading: boolean;
};
export const TweetsList = ({ tweets, isLoading }: TweetsListProps) => {
  if (isLoading) {
    return (
      <Center w="100%" h="500px">
        <Spinner colorScheme="purple" />
      </Center>
    );
  }
  return (
    <VStack spacing="32px">
      {tweets.map((tweet) => (
        <TweetView key={tweet.id} tweet={tweet} />
      ))}
    </VStack>
  );
};

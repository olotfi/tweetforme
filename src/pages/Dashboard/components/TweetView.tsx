import React from 'react';
import { Badge, Box, Text, VStack } from '@chakra-ui/react';
import { Tweet, TweetStatus } from '../../../lib/Tweet';
import { getFormattedDateAndTime } from '../../../lib/dateUtils';

export type TweetProps = {
  tweet: Tweet;
};
export const TweetView = ({ tweet }: TweetProps) => {
  const statusColourScheme = tweet.status === TweetStatus.SUBMITTED ? 'yellow' : 'green';

  return (
    <Box px="32px" py="16px" bg="gray.50" borderRadius="4px" w="100%">
      <VStack align="left" spacing="16px">
        <Box textAlign="right">
          <Badge colorScheme={statusColourScheme}>{tweet.status}</Badge>
        </Box>
        <Text>{tweet.content}</Text>
        <Box textAlign="right">
          <Text fontSize="xs" color="gray.500">
            {getFormattedDateAndTime(tweet.created)}
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};

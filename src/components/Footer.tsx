import { Box, Link, Text } from '@chakra-ui/react';
import React from 'react';

export const Footer = () => {
  return (
    <Box textAlign="center" color="gray.500" fontSize="sm" py="32px">
      <Text>Created by Oly Lotfi</Text>
      <Text>
        <Link href="https://github.com/olotfi/tweetforme">View on GitHub</Link> -{' '}
        <Link href="https://tweetforme-c9003.rowy.app/">Go to Rowy</Link>
      </Text>
    </Box>
  );
};

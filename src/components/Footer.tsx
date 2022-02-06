import { Box, Link, Text } from '@chakra-ui/react';
import React from 'react';

export const Footer = () => {
  return (
    <Box textAlign="center" color="gray.500" fontSize="sm" p="32px">
      <Text>Created by Oly Lotfi.</Text>
      <Text>
        <Link>View on GitHub</Link> - <Link>Go to Rowy</Link>
      </Text>
    </Box>
  );
};

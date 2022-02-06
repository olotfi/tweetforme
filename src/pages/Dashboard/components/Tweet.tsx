import React from 'react';
import { Badge, Box, Text, VStack } from '@chakra-ui/react';

export type TweetProps = {
  id: string;
  content: string;
  status: 'submitted' | 'approved';
  createdAt: string;
};
export const Tweet = ({ content, status, createdAt }: TweetProps) => {
  const statusColourScheme = status === 'submitted' ? 'yellow' : 'green';

  return (
    <Box px="32px" py="16px" bg="gray.50" borderRadius="4px" w="100%">
      <VStack align="left" spacing="16px">
        <Box textAlign="right">
          <Badge colorScheme={statusColourScheme}>{status}</Badge>
        </Box>
        <Text>{content}</Text>
        <Box textAlign="right">
          <Text fontSize="sm" color="gray.500">
            {createdAt}
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};

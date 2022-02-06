import { Center, Spinner } from '@chakra-ui/react';
import React from 'react';

export const LoadingScreen = () => {
  return (
    <Center w="100vw" h="100vh">
      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.100" color="purple.500" size="xl" />
    </Center>
  );
};

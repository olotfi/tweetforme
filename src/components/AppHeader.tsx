import { Avatar, Button, HStack, Spacer, Text } from '@chakra-ui/react';
import { signOut } from 'firebase/auth';
import React from 'react';
import { useCurrentUser } from '../context/auth';
import { auth } from '../lib/firebase';

export const AppHeader = () => {
  const { currentUser } = useCurrentUser();
  const logout = () => signOut(auth);

  return (
    <HStack>
      <HStack spacing="8px" align={'center'}>
        <Avatar name={currentUser!.name as string} size="sm" colorScheme="gray" />
        <Text>{currentUser!.name}</Text>
      </HStack>
      <Spacer />
      <Button variant="link" onClick={logout}>
        Logout
      </Button>
    </HStack>
  );
};

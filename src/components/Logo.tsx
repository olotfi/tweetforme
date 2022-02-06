import { Heading } from '@chakra-ui/react';
import React from 'react';

export const Logo = () => {
  return (
    <Heading
      size="lg"
      fontWeight="extrabold"
      bgClip="text"
      sx={{
        backgroundImage: 'linear-gradient(to right, #7928CA 0%, #FF0080 20%)'
      }}
    >
      TweetForMe
    </Heading>
  );
};

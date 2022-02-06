import { Container, ContainerProps } from '@chakra-ui/react';
import React, { useEffect } from 'react';

export type PageProps = ContainerProps & {
  title?: string;
  children: React.ReactNode;
};

export const Page = ({ title = 'TweetForMe', children, ...rest }: PageProps) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <Container maxWidth={1200} {...rest}>
      {children}
    </Container>
  );
};

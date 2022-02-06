import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack
} from '@chakra-ui/react';
import { AuthError, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../../components/Logo';
import { Page } from '../../components/Page';
import { useCurrentUser } from '../../context/auth';
import { auth, mapErrorCodeToUserFriendlyMessage } from '../../lib/firebase';
import { Footer } from '../../components/Footer';
import { ErrorAlert } from '../../components/ErrorAlert';

export const Login = () => {
  const navigate = useNavigate();
  const { currentUser } = useCurrentUser();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (currentUser !== null) navigate('/');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      const errorCode = (error as AuthError).code;
      const errorMessage = mapErrorCodeToUserFriendlyMessage(errorCode);
      setLoginError(errorMessage);
      setIsLoading(false);
      setPassword('');
    }
  };

  return (
    <Page title="TweetForMe | Login">
      <Flex direction="column" justify="space-between" height="100vh">
        <Box py="32px">
          <Logo />
        </Box>

        <Box width="480px" alignSelf="center">
          <Heading size="lg" mb="24px">
            Login to your account
          </Heading>

          <form onSubmit={handleSubmit}>
            <VStack>
              {loginError ? (
                <ErrorAlert errorMessage={loginError} onClose={() => setLoginError('')} />
              ) : null}

              <FormControl isRequired>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" type="email" value={email} onChange={handleEmailChange} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </FormControl>
            </VStack>

            <Button type="submit" isLoading={isLoading} rightIcon={<ArrowForwardIcon />} mt="24px">
              Login
            </Button>
          </form>
        </Box>

        <Footer />
      </Flex>
    </Page>
  );
};

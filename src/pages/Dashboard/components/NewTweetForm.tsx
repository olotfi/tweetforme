import { Button, FormControl, FormErrorMessage, Textarea, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { ErrorAlert } from '../../../components/ErrorAlert';
import { useCurrentUser } from '../../../context/auth';
import { Tweet } from '../../../lib/Tweet';
import { createTweet } from '../../../lib/tweets';

export type NewTweetFormProps = {
  addTweet: (newTweet: Tweet) => void;
};
export const NewTweetForm = ({ addTweet }: NewTweetFormProps) => {
  const { currentUser } = useCurrentUser();

  const [content, setContent] = useState('');
  const [contentFieldError, setContentFieldError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleBlur = () => {
    if (content.length > 280) {
      setContentFieldError('Your tweet cannot be longer than 280 characters.');
    } else {
      setContentFieldError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (contentFieldError) return;
    if (content.length === 0) setContentFieldError('Your tweet cannot be empty.');
    setIsLoading(true);
    try {
      const tweet = await createTweet(content, currentUser!.uid);
      addTweet(tweet);
      setContent('');
    } catch (error) {
      setSubmitError((error as Error).message);
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack>
        {submitError ? (
          <ErrorAlert errorMessage={submitError} onClose={() => setSubmitError('')} />
        ) : null}

        <FormControl isInvalid={contentFieldError !== ''}>
          <Textarea
            placeholder="What do you want to tweet?"
            value={content}
            onChange={handleContentChange}
            onBlur={handleBlur}
            resize="none"
          />
          <FormErrorMessage>{contentFieldError}</FormErrorMessage>
        </FormControl>

        <Button type="submit" alignSelf="end" isLoading={isLoading}>
          Submit
        </Button>
      </VStack>
    </form>
  );
};

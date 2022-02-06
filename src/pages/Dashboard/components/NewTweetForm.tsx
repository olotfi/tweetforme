import React, { useState } from 'react';
import { Button, FormControl, FormErrorMessage, Textarea, VStack } from '@chakra-ui/react';
import { ErrorAlert } from '../../../components/ErrorAlert';

export const NewTweetForm = () => {
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
    console.log(content); // Replace with Firestore API call
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

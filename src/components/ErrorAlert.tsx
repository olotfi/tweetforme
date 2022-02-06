import { Alert, AlertDescription, AlertIcon, AlertProps, CloseButton } from '@chakra-ui/react';
import React from 'react';

export type ErrorAlertProps = AlertProps & {
  errorMessage: string;
  onClose: () => void;
};
export const ErrorAlert = ({ errorMessage, onClose }: ErrorAlertProps) => {
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertDescription>{errorMessage}</AlertDescription>
      <CloseButton position="absolute" right="8px" top="8px" onClick={onClose} />
    </Alert>
  );
};

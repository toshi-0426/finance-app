/* eslint @typescript-eslint/no-explicit-any: 0 */
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
/*
type FormErrorProps = {
    error?: string | FieldError | FieldErrors | Error | null | undefined
}*/

type FormErrorType =
  | string
  | Error
  | FieldError
  | Merge<FieldError, FieldErrorsImpl<any>>
  | undefined
  | null;

type Props = {
  error: FormErrorType;
};

export function FormError({error}: Props ) {
    if (!error) return null;

    let message: string | undefined;

    if (typeof error === 'string') {
        message = error;
    } else if (error instanceof Error) {
        message = error.message;
    } else if (
        typeof error === 'object' &&
        'message' in error &&
        typeof error.message === 'string'
    ) {
        message = error.message;
    }

    if (!message) return null;

    return <p className="text-sm text-red-500">{message}</p>;
}
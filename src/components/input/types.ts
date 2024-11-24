import { FormikErrors } from 'formik';
import { TextareaHTMLAttributes } from 'react';

// INPUT TYPES START
export type InputPasswordType = 'password';
export type InputTextType = 'text';
export type InputEmailType = 'email';
export type InputDateType = 'date';
export type InputFileType = 'file';
export type InputSelectType = 'select';
// INPUT TYPES END

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'primary' | 'secondary';
  touched?: boolean;
  error?: string;
  labelClassName?: string;
  label?: string;
  id: string;
  type: InputPasswordType | InputTextType | InputEmailType | InputDateType;
  inputClassName?: string;
  containerClassName?: string;
  initialValue?: string;
  initialTouched?: boolean;
  initialError?: string;
}
export type SelectProps = React.SelectHTMLAttributes<
  HTMLSelectElement | HTMLInputElement
> & {
  className?: string;
  id: string;
  error?: boolean | string;
  touched?: boolean;
  label?: string;
  placeholder: string;
  labelClassName?: string;
  options?: readonly {
    readonly value: string;
    readonly label: string;
  }[];
  setValue?: (
    value: string,
    shouldValidate: boolean
  ) => Promise<void | FormikErrors<unknown>>;
  setTouched?: (
    touched: boolean,
    shouldValidate: boolean
  ) => Promise<void | FormikErrors<unknown>>;
  value?: string;
};

export interface MultilineProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean | string;
  touched?: boolean;
  variant?: 'primary' | 'secondary';
  inputClassName?: string;
  containerClassName?: string;
  labelClassName?: string;
  label?: string;
  initialValue?: string;
  initialTouched?: boolean;
  initialError?: string;
}

export type SelectOption = { readonly value: string; readonly label: string };

export type InputFileProps = React.InputHTMLAttributes<HTMLInputElement> & {
  value?: (string | File)[] | File[];
  variant?: 'primary' | 'secondary';
  label?: string;
  id: string;
  error?: boolean | string;
  touched?: boolean;
  setValue?: (
    value: (string | File)[],
    shouldValidate: boolean
  ) => Promise<void | FormikErrors<unknown>>;
  setTouched?: (
    touched: boolean,
    shouldValidate: boolean
  ) => Promise<void | FormikErrors<unknown>>;
  type?: InputFileType;
  inputClassName?: string;
  containerClassName?: string;
  initialValue?: string;
  initialTouched?: boolean;
  initialError?: string;
  labelClassName?: string;
};

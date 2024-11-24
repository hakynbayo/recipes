'use client';

import { useFormik } from 'formik';
import { useRouter, useSearchParams } from 'next/navigation';
import { ImSpinner2 } from 'react-icons/im';

import { cn } from '@/lib/utils';

import { initialValues, validationSchema } from './validation';

export interface InputSearchProp
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'secondary';
  touched?: boolean;
  error?: string;
  inputClassName?: string;
  containerClassName?: string;
  updateQuery?: boolean;
}

const InputSearch = ({
  isLoading,
  disabled,
  variant = 'primary',
  touched,
  error,
  className,
  inputClassName,
  containerClassName,
  updateQuery,
  ...rest
}: InputSearchProp) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const formik = useFormik({
    initialValues: {
      ...initialValues,
      search: searchParams.get('search') || '',
    },
    validationSchema,
    onSubmit: (values) => {
      if (updateQuery) {
        const params = new URLSearchParams(searchParams);
        if (values.search) {
          params.set('search', values.search);
        } else {
          params.delete('search');
        }

        router.replace(`?${params.toString()}`, { scroll: false });
        return;
      }

      const params = new URLSearchParams();
      if (values.search) {
        params.set('search', values.search);
      } else {
        params.delete('search');
      }

      router.replace(`?${params.toString()}`, {
        scroll: false,
      });
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={cn(
        'flex w-full flex-row items-center gap-4 rounded-md border text-xs transition-all duration-300 ease-linear md:text-sm lg:text-base',
        [
          variant === 'primary' && 'border-secondary-grey bg-white',
          variant === 'secondary' && 'bg-secondary-grey',
        ],
        [touched && error && 'bg-primary-red/10'],
        [containerClassName && containerClassName]
      )}
    >
      <input
        type='text'
        inputMode='search'
        id='search'
        onChange={formik.handleChange}
        className={cn(
          'border-primary-zinc text-secondary-black w-full rounded-lg border-0 bg-transparent bg-[url(https://api.iconify.design/uil/search.svg)] bg-[top_50%_left_1rem] bg-no-repeat px-2 py-2  pl-10 text-xs shadow-none outline-none ring-0 placeholder:text-xs placeholder:text-black focus:ring-0 sm:pl-[3.5rem] md:px-4 md:pl-12 md:text-sm md:placeholder:text-sm lg:text-base lg:placeholder:text-base',
          [className && className],
          [inputClassName && inputClassName]
        )}
        disabled={disabled || isLoading}
        value={formik.values.search}
        {...rest}
      />
      {isLoading && (
        <div className='text-amali-green absolute right-6 top-1/2 -translate-y-1/2'>
          <ImSpinner2 className='animate-spin' />
        </div>
      )}
    </form>
  );
};

export default InputSearch;

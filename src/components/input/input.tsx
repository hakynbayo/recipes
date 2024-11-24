'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import { cn } from '@/lib/utils';

import { InputLabel } from '@/components/input';
import { InputProps } from '@/components/input/types';

export default function Input({
  id,
  labelClassName,
  className,
  inputClassName,
  label,
  touched,
  error,
  type,
  value,
  variant = 'primary',
  required,
  ...rest
}: InputProps) {
  const [hidden, setHidden] = useState<boolean>(true);

  const toggleVisibility = (): void => {
    setHidden((prevState) => !prevState);
  };

  delete rest.initialError;
  delete rest.initialTouched;
  delete rest.initialValue;

  return (
    <div className='w-full'>
      <div className='flex flex-col gap-2'>
        <div className='flex items-center gap-1'>
          {label && !!label.length && (
            <InputLabel className={labelClassName} id={id} label={label} />
          )}
          {required && <span className='text-primary-red'>*</span>}
        </div>
        {type === 'password' && (
          <div
            className={cn(
              'border-gray relative flex w-full flex-row items-center rounded-[4px] border text-xs transition-all duration-300 ease-linear md:text-sm lg:text-base',
              [
                variant === 'primary' && 'border-gray bg-white',
                variant === 'secondary' && 'bg-secondary-grey',
              ],
              [touched && error && 'bg-primary-red/10']
            )}
          >
            <input
              type={hidden ? 'password' : 'text'}
              value={value}
              autoComplete='off'
              id={id}
              {...rest}
              className={cn(
                'placeholder:text-secondary-grey text-primary-black w-full border-0 bg-transparent px-2 py-1 text-xs shadow-none outline-none ring-0 placeholder:text-xs focus:ring-0 md:px-4 md:text-sm md:placeholder:text-sm lg:text-base lg:placeholder:text-base',
                [className && className],
                [inputClassName && inputClassName]
              )}
              required={required}
            />

            <span className='absolute right-0 -translate-x-1/2'>
              {!hidden ? (
                <svg
                  className='h-5 w-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                  onClick={toggleVisibility}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1'
                    d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                  ></path>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1'
                    d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                  ></path>
                </svg>
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  onClick={toggleVisibility}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1'
                    d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21'
                  />
                </svg>
              )}
            </span>
          </div>
        )}

        {(type === 'email' || type === 'date' || type === 'text') && (
          <div
            className={cn(
              'border-gray flex w-full flex-row items-center rounded-[4px] border text-xs transition-all duration-300 ease-linear md:text-sm lg:text-base',
              [
                variant === 'primary' && 'border-gray bg-white',
                variant === 'secondary' && 'bg-secondary-grey',
              ],
              [touched && error && 'bg-primary-red/10']
            )}
          >
            <input
              type={type}
              value={value}
              id={id}
              {...rest}
              className={cn(
                'placeholder:text-secondary-grey text-primary-black w-full border-0 bg-transparent px-2 py-1 text-xs shadow-none outline-none ring-0 placeholder:text-xs focus:ring-0 md:px-4 md:text-sm md:placeholder:text-sm lg:text-base lg:placeholder:text-base',
                [className && className],
                [inputClassName && inputClassName]
              )}
              required={required}
            />
          </div>
        )}
      </div>
      <AnimatePresence>
        {error && touched && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ ease: 'easeOut', duration: 0.5 }}
            className='pl-1 pt-1 text-xs font-semibold text-red-300'
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

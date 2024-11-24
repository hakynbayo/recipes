import React from 'react';
interface ICheckBoxProps {
  className?: string;
  classNames?: {
    label?: string;
    input?: string;
    wrapper?: string;
  };
  name?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string | JSX.Element;
  checked?: boolean;
  id?: string;
}
/**
 *
 * @param {object} - Inputprops
 * @return {JSXElement}
 */
export default function Checkbox({
  classNames,
  label,
  name,
  checked,
  onChange,
  value,
  id,
  ...rest
}: ICheckBoxProps): JSX.Element {
  return (
    <>
      <div
        className={`mb-2 flex h-6 cursor-pointer items-center rounded-lg ${
          classNames?.wrapper ?? ''
        }
            `}
      >
        <input
          type='checkbox'
          className={` h-3 w-3 cursor-pointer border border-[#484C4A] accent-black outline-none focus:outline-none focus:ring-0 ${
            classNames?.input || ''
          }`}
          {...rest}
          id={id}
          name={name}
          onChange={onChange}
          checked={checked}
          value={value}
        />
        <label
          htmlFor={id}
          className={` flex h-6 cursor-pointer items-center justify-center rounded-sm border-white ${
            checked ? 'rounded-lg border-0' : 'rounded-lg border'
          }`}
        ></label>
        <label htmlFor={id} className={` ml-2 ${classNames?.label || ''}`}>
          {label}
        </label>
      </div>
    </>
  );
}

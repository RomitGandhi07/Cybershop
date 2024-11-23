// @ts-nocheck
import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';

export default function Textarea({ name, onChange, ...props }: any) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext(); // retrieve all hook methods

  const defaultClasses = "text-black mt-4 rounded-3xl w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent";

  const elementProps = {
    name: name,
    ...props,
    className: props.className && !props.mergeClasses ? props.className : `${defaultClasses} ${props.className ?? ""}`,
  };

  delete elementProps.mergeClasses;
  // @ts-ignore
  // @ts-ignore
  return (
    <>

      <Controller
        control={control}
        {...register(name)}
        // {...props}
        render={({ field: { onChange: onChangeValue, value } }) => (
          <textarea
            {...elementProps}
            value={value}
            onChange={(event: any) => {
              const newValue = event.target.value;

              // Update react-hook-form's internal value
              onChangeValue(newValue);

              // Invoke original onChange method
              if (onChange) {
                onChange({ [name]: newValue });
              }  
            }}
          />
      )}
      />
      {errors?.[name]?.message ? (
        <span className="text-xs text-red-800 pt-0">{errors?.[name]?.message}</span>
      ) : null}
    </>
  );
}

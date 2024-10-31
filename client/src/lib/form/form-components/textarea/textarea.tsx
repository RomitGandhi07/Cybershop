// @ts-nocheck
import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';

export default function Textarea({ name, onChange, ...props }: any) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext(); // retrieve all hook methods
  const elementProps = {
    name: name,
    ...props,
    className: `form-control ${errors?.[name] ? 'is-invalid' : ''}`,
  };

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

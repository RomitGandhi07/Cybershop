import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';


export default function Password({ name, onChange, ...props }: any) {
  const {
    register,
    control,
    formState: { errors },
  }: any = useFormContext(); // retrieve all hook methods

  const defaultClasses = "form-control";

  const elementProps = {
    name: name,
    ...props,
    className: props.className && !props.mergeClasses ? props.className : `${defaultClasses} ${props.className ?? ""}`,
  };

  delete elementProps.mergeClasses;

  return (
    <>

      <Controller
        control={control}
        {...register(name)}
        // {...props}
        ref={null}
        render={({ field: { onChange: onChangeValue, value } }) => (
          <input
            {...elementProps}
            type='password'
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

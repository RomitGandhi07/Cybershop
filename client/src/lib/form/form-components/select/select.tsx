// @ts-nocheck
import React, { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';


export default function Select({ name, onChange, options = null, ...props }: any) {
  const [option, setOptions] = useState(options);
  const {
    register,
    control,
    formState: { errors },
  }: any = useFormContext(); // retrieve all hook methods


  const defaultClasses = "bg-white";

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
        render={({ field: { onChange: onChangeValue, onBlur, value, ref } }) => (
          <select
          {...elementProps}
          onChange={(event: any) => {
            const newValue = event.target.value;

            // Update react-hook-form's internal value
            onChangeValue(newValue);

            // Invoke original onChange method
            if (onChange) {
              onChange({ [name]: newValue });
            }
          }}
          >
            <option value="" selected>{elementProps.placeholder ?? "Select"}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      />
      {errors?.[name]?.message ? (
        <span className="text-xs text-red-800 pt-0">{errors?.[name]?.message}</span>
      ) : null}
    </>
  );
}

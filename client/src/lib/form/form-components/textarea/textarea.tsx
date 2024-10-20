// @ts-nocheck
import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextArea } from '@blueprintjs/core';

export const TextAreaEle = (elementProps: any) => {
  return (
    <TextArea
      {...elementProps}
    />
  );
};

export default function Textarea({ name, onChange, ...props }: any) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext(); // retrieve all hook methods
  const elementProps = {
    name: name,
    ...props,
    onChange: (event: any) => (onChange ? onChange(event.target.value) : null),
    className: `form-control ${errors?.[name] ? 'is-invalid' : ''}`,
  };

  // @ts-ignore
  // @ts-ignore
  return (
    <>

      <Controller
        control={control}
        {...register(name)}
        {...props}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <TextAreaEle
            {...elementProps}
            value={value}
            onChange={(event: any) => {
              onChange(event);
              if (elementProps?.onChange) {
                elementProps.onChange(event);
              }
            }}
          />
        )}
      />
      {errors?.[name]?.message ? (
        <span className="error-msg m-t-8">{errors?.[name]?.message}</span>
      ) : null}
    </>
  );
}

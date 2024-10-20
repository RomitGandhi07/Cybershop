import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { NumericInput } from '@blueprintjs/core';



export const NumberInputEle = (elementProps: any) => {
  return (
    <NumericInput
      buttonPosition={'none'}
      {...elementProps}
    />
  );
};

export default function Input({ name, onChange, ...props }: any) {
  const {
    register,
    control,
    formState: { errors },
  }: any = useFormContext(); // retrieve all hook methods
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
        render={({ field: { onChange : onChnageValue, value } }) => (
          <NumberInputEle
            {...elementProps}
            value={value}
            onValueChange={(event: any) => {
              onChnageValue(event);
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

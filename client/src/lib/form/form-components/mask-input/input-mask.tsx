// @ts-nocheck
import React from 'react';
import { InputGroup } from '@blueprintjs/core';
import InputMask from 'react-input-mask';
import { Controller, useFormContext } from 'react-hook-form';
export const MaskInputEle = (props) => {
  return (
    <InputMask {...props}
               // beforeMaskedValueChange={(l) => {
               //   console.log('j', l);
               // }}
              >
      {(inputProps) => (
        <InputGroup
          {...inputProps}
          type="text"
          // leftIcon="globe"
        />
      )}
    </InputMask>
  );
};




export default function MaskInput({ name, onChange, ...props })  {
  const {
    register,
    control,
    formState: { errors },
  }: any = useFormContext(); //
  const elementProps = {
    name: name,
    ...props,
    onChange: (event: any) => (onChange ? onChange(event.target.value) : null),
    className: `form-control ${errors?.[name] ? 'is-invalid' : ''}`,
  };

  return (
<>
    <Controller
      control={control}
      {...register(name)}
      {...props}
      render={({ field: { onChange: onChangeValue, value } }) => (
        <>
            <MaskInputEle
              {...elementProps}
              value={value}
              onChange={(event: any) => {
                onChangeValue(event);
                if (elementProps?.onChange) {
                  elementProps.onChange(event);
                }
              }}
            />
        </>
      )}/>
  {errors?.[name]?.message ? (
    <span className="error-msg m-t-8">{errors?.[name]?.message}</span>
  ) : null}
</>
  );
}

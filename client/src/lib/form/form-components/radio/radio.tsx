// @ts-nocheck
import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { RadioGroup as BRadioGroup, Radio as BRadio } from '@blueprintjs/core';




export const RadioEle = (elementProps: any) => {
  const { values, onChange } = elementProps;
  const [selectedValue, setSelectedValue] = useState(null);
  return (
    <BRadioGroup
      {...elementProps}
      selectedValue={selectedValue}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e);
        setSelectedValue(e.target.value);
      }}
    >
      {
        values.map(({ label, value }, index) => {
          return (
            <BRadio key={index} label={label} value={value} />
          );
        })
      }

    </BRadioGroup>
  );
};
export default function Radio({ name, onChange, ...props }) {
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
  return (
    <>
      {console.info("IN the radio")}
      <Controller
        control={control}
        {...register(name)}
        {...props}
        render={({ field: { onChange: onChangeValue, value } } : any) => (
          <>
            <RadioEle
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
        )}
      />
      {errors?.[name]?.message ? (
        <span className="error-msg m-t-8">{errors?.[name]?.message}</span>
      ) : null}
    </>
  );
}

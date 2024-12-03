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
export default function Radio({ name, options, onChange, ...props }) {
  const {
    register,
    control,
    formState: { errors },
  }: any = useFormContext(); // retrieve all hook methods

  const elementProps = {
    name: name,
    ...props,
    className: `form-control ${errors?.[name] ? 'is-invalid' : ''}`,
  };
  
  return (
    <>
      {console.info("IN the radio")}
      <Controller
        control={control}
        {...register(name)}
        {...props}
        render={({ field: { onChange: onChangeValue, value } }: any) => (
          <>
            {(options ?? []).map((option, index) => (
              <label
                key={index}
                className={`flex items-start space-x-3 p-4 cursor-pointer ${value === option.value ? 'text-orange-600' : 'border-gray-300'
                  } hover:border-orange-500 transition duration-200`}
              >
                <input
                  key={index}
                  type="radio"
                  value={option.value}
                  checked={value === option.value}
                  onChange={(e) => {
                    const newValue = event.target.value;

                    // Update react-hook-form's internal value
                    onChangeValue(newValue);

                    // Invoke original onChange method
                    if (onChange) {
                      onChange({ [name]: newValue });
                    }
                  }}
                  className="h-7 w-7 text-orange-500 border-gray-300 focus:ring-orange-500"
                />
                <div>
                  <span className="font-medium text-gray-900">{option.label}</span>
                  {option.description && (
                    <p className="text-sm text-gray-500">{option.description}</p>
                  )}
                </div>
              </label>
            ))}
          </>
        )}
      />
      {errors?.[name]?.message ? (
        <span className="error-msg m-t-8">{errors?.[name]?.message}</span>
      ) : null}
    </>
  );
}

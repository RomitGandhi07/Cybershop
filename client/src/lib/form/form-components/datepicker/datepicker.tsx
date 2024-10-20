// @ts-nocheck
import React, { useCallback, useRef, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';
import { DateInput3 } from '@blueprintjs/datetime2';


export const DatePicketEle = (elementProps) => {
  const [dateValue, setDateValue] = useState<string>(null);
  const formatDate = useCallback((date: Date) => date.toLocaleString(), []);
  const parseDate = useCallback((str: string) => new Date(str), []);
  const handleChange = (val) => {
    setDateValue(val);
  };

  const eleProps =  {
    ...elementProps,
    onChange: (val) => {
      handleChange(val);
      if (elementProps?.onChange) {
        elementProps?.onChange(val);
      }
    },
  };

  return (

    <DateInput3
      formatDate={formatDate}
      onChange={handleChange}
      parseDate={parseDate}
      placeholder="M/D/YYYY"
      value={dateValue}
      {...eleProps}


    />
  );

};
export default function DatepickerInput({
  name,
  ...props
}: any) {


  const {
    register,
    control,
    formState: { errors },
  }: any = useFormContext(); // retrieve all hook methods


  const elementProps = {
    name: name,
    ...props,
  };



  return (
    <>
      <Controller
        control={control}
        {...register(name)}
        {...props}
        render={({ field: { onChange, onBlur, value } }) => {
          // @ts-ignore
          // @ts-ignore
          return (
            <>
              <DatePicketEle
                {...elementProps}
                onChange={onChange}
                value={value}
              />

            </>
          );
        }}
      />
      {errors?.[name]?.message ? (
        <span className="error-msg">{errors?.[name]?.message}</span>
      ) : null}
    </>
  );
}

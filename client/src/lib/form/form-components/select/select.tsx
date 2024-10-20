// @ts-nocheck
import React, { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { MenuItem, Button } from '@blueprintjs/core';
import { Select2 } from '@blueprintjs/select';


export const SelectInputEle = (elementProps: any) => {
  const [selectedOption, setSelectedOption] = useState(null);



  const renderOptions = (opt, { handleClick, handleFocus }) => {
    return (
      <MenuItem
        text={opt.label}
        roleStructure="listoption"
        active={selectedOption?.value === opt.value}
        key={opt.title}
        onClick={handleClick}
        onFocus={handleFocus}
      />
    );
  };


  const filterCallBack  = (query, film, _index, exactMatch) => {
    const normalizedTitle = film.label.toLowerCase();
    const normalizedQuery = query.toLowerCase();

    if (exactMatch) {
      return normalizedTitle === normalizedQuery;
    } else {
      return `${normalizedTitle} `.indexOf(normalizedQuery) >= 0;
    }
  };
  return (
    <Select2<any>
      {...elementProps}
      itemPredicate={filterCallBack}
      itemRenderer={renderOptions}
      noResults={<MenuItem disabled={true} text="No results." roleStructure="listoption" />}
      onItemSelect={(event:  React.ChangeEvent<HTMLInputElement> ) => {
        setSelectedOption(event);
        if (elementProps?.onChange) {
          elementProps.onChange(event);
        }
      }}
    >
      <Button rightIcon="double-caret-vertical" text={selectedOption?.label || 'Select Option'} loading={false} placeholder="Select a Option" />


    </Select2>
  );
};


export default function Select({ name, onChange, options = null, ...props }: any) {
  const [option, setOptions] = useState(options);
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
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <SelectInputEle
            {...elementProps}
            items={option}
            onChange={onChange}

          />
        )}
      />
      {errors?.[name]?.message ? (
        <span className="error-msg m-t-8">{errors?.[name]?.message}</span>
      ) : null}
    </>
  );
}

// @ts-nocheck
import React, { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { MenuItem, Button } from '@blueprintjs/core';
import { Select2 } from '@blueprintjs/select';


// export const SelectInputEle = (elementProps: any) => {
//   const [selectedOption, setSelectedOption] = useState(null);



//   const renderOptions = (opt, { handleClick, handleFocus }) => {
//     return (
//       <MenuItem
//         text={opt.label}
//         roleStructure="listoption"
//         active={selectedOption?.value === opt.value}
//         key={opt.title}
//         onClick={handleClick}
//         onFocus={handleFocus}
//       />
//     );
//   };


//   const filterCallBack  = (query, film, _index, exactMatch) => {
//     const normalizedTitle = film.label.toLowerCase();
//     const normalizedQuery = query.toLowerCase();

//     if (exactMatch) {
//       return normalizedTitle === normalizedQuery;
//     } else {
//       return `${normalizedTitle} `.indexOf(normalizedQuery) >= 0;
//     }
//   };
//   return (
//     <Select2<any>
//       {...elementProps}
//       itemPredicate={filterCallBack}
//       itemRenderer={renderOptions}
//       noResults={<MenuItem disabled={true} text="No results." roleStructure="listoption" />}
//       onItemSelect={(event:  React.ChangeEvent<HTMLInputElement> ) => {
//         setSelectedOption(event);
//         if (elementProps?.onChange) {
//           elementProps.onChange(event);
//         }
//       }}
//     >
//       <Button rightIcon="double-caret-vertical" text={selectedOption?.label || 'Select Option'} loading={false} placeholder="Select a Option" />


//     </Select2>
//   );
// };


export default function Select({ name, onChange, options = null, ...props }: any) {
  const [option, setOptions] = useState(options);
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
            <option value="">Select...</option>
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

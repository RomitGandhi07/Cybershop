import React from 'react';
import { useFormContext } from 'react-hook-form';

// export function SingleCheckbox({ name, onChange = null, value, ...props }: {
//   name: string;
//   onChange?: Function | null;
//   value: string;
// }) {
//   const {
//     register,
//     formState: { errors },
//   } = useFormContext(); // retrieve all hook methods

//   return (
//     <input
//       type="checkbox"
//       value={value}
//       key={`checkbox_${name}`}
//       {...register(name)}
//       {...props}
//       onChange={(event) =>
//         onChange ? onChange(event.target.checked, event.target.value) : null
//       }
//       className={`form-control ${errors?.[name] ? 'is-invalid' : ''}`}
//     />
//   );
// }

export default function Checkbox({ name, onChange, values, ...props } :  {
  name: string;
  onChange?: Function | null;
  values: {id: string, label: string}[];
  className?: string,
  mergeClasses?: boolean
}) {
  const {
    register,
    formState: { errors },
  }: any = useFormContext(); // retrieve all hook methods

  const defaultClasses = "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600";

  const elementProps = {
    name: name,
    ...props,
    className: props.className && !props.mergeClasses ? props.className : `${defaultClasses} ${props.className ?? ""}`,
  };

  delete elementProps.mergeClasses;

  return (
    <>
      {values.map(({ id, label }) => (
        <>
          <input
            type="checkbox"
            value={id}
            key={`checkbox_${id}`}
            {...register(name)}
            {...props}
             onChange={(event: any) => {
              const newValue = event.target.value;

              // Invoke original onChange method
              if (onChange) {
                onChange({ [name]: newValue });
              }
            }}
          />
          <span>{label}</span>
          {errors?.[name]?.message ? (
        <span className="text-xs text-red-800 pt-0">{errors?.[name]?.message}</span>
      ) : null}
        </>
      ))}
    </>
  );
}

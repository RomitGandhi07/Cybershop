import React from 'react';
import { useFormContext } from 'react-hook-form';

export function SingleCheckbox({ name, onChange = null, value, ...props }: {
  name: string;
  onChange?: Function | null;
  value: string;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext(); // retrieve all hook methods

  return (
    <input
      type="checkbox"
      value={value}
      key={`checkbox_${name}`}
      {...register(name)}
      {...props}
      onChange={(event) =>
        onChange ? onChange(event.target.checked, event.target.value) : null
      }
      className={`form-control ${errors?.[name] ? 'is-invalid' : ''}`}
    />
  );
}

export default function Checkbox({ name, onChange, values, ...props } :  {
  name: string;
  onChange?: Function | null;
  values: {id: string, label: string}[];
}) {
  const {
    register,
    formState: { errors },
  }: any = useFormContext(); // retrieve all hook methods
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
            onChange={(event) =>
              onChange ? onChange(event.target.value) : null
            }
            className={`form-control ${errors?.[name] ? 'is-invalid' : ''}`}
          />
          <span>{label}</span>
          {errors?.[name]?.message ? (
            <span className="error-msg m-t-8">{errors?.[name]?.message}</span>
          ) : null}
        </>
      ))}
    </>
  );
}

// @ts-nocheck
import React, {
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
//
// import classes from './form.module.scss';
import Input from './form-components/input/input';
import Number from './form-components/number/number';
import Password from './form-components/password/password';
import Textarea from './form-components/textarea/textarea';
import Checkbox from './form-components/checkbox/checkbox';
import Radio from './form-components/radio/radio';
import SelectList from './form-components/select/select';

import Switch from './form-components/switch/switch';
import DatepickerInput from './form-components/datepicker/datepicker';
import MaskInput from './form-components/mask-input/input-mask';

function ItemBlock({
  label,
  type,
  blocktype,

  ...props
}: any) {
  const typeArr = {
    input: Input,
    number: Number,
    password: Password,
    textarea: Textarea,
    checkbox: Checkbox,
    radio: Radio,
    select: SelectList,
    // datePicker: DatepickerInput,
    mask: MaskInput,
    // daterangepicker: Daterangepicker,
    // customDateRangePicker: CustomDateRangePicker,
    // mask: MaskInput,
    // objectField: ControllerField,
    // hiddenField: HiddenField,
    // GoogleAutocomplete: GoogleAutocomplete,
    // currencyInput: CurrencyInput,
    // ipAddressInput: IpAddressInput,
    // percentageInput: PercentagInput,
    switchInput: Switch,
  };

  const TypeComp = typeArr[type];

  const formElement = () => {
    return label ? (
      <div className={`${blocktype === 'left' ? 'left' : 'right'}`}>
        <label htmlFor={`${props.name}`}>{label}</label>
        <TypeComp key={1} {...props} type={type} />
      </div>
    ) : (
      <div className={`${blocktype === 'left' ? ' left' : 'right'}`}>
        <TypeComp key={1} {...props} type={type} />
      </div>
    );
  };

  return <>{formElement()}</>;
}

export function FormItems({ fields }) {
  console.log('fields', fields);
  return (
    <div className={'formMain'}>
      {fields.map((items) => (
        <div className={'formbox '} key={`formelement_${items.name}_left`}>
          <div className={'ordformlist'}>
            <ItemBlock
              key={`formelement_${items.name}_left`}
              blocktype="left"
              {...items}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function Form(props, ref) {
  const { defaultValues, validationSchema, onSubmit, children } =
    props;
  const submitRef = useRef(null);
  const formOptions = {
    defaultValues,
    resolver: yupResolver(validationSchema),
  };
  const methods = useForm({ ...formOptions, mode: 'all' });

  useImperativeHandle(ref, () => ({
    submit() {
      if (submitRef.current !== null) {
        submitRef.current.click();
      }
    },
    resetFieldWithError(field, defaultValue) {
      setTimeout(() => {
        methods.resetField(field, {
          keepDirty: false,
          keepTouched: false,
          keepError: false,
          defaultValue: defaultValue ?? '',
        });
      }, 100);
    },
    resetAll() {
      setTimeout(() => {
        methods.reset(
          {},
          {
            keepErrors: true,
            keepDirty: true,
            keepIsSubmitted: false,
            keepTouched: false,
            keepIsValid: false,
            keepSubmitCount: false,
          },
        );
      }, 100);
    },
    resetField(field, value = '') {
      setTimeout(() => {
        methods.setValue(field, value, { shouldValidate: true });
      }, 100);
    },
    // isFormValid();
  }));

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {/*<FormItems fields={formItems} />*/}
        {children}
        <input type="submit" style={{ display: 'none' }} ref={submitRef} />
      </form>
    </FormProvider>
  );
}

export default forwardRef(Form);

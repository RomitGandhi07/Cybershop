import React, { useRef, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import ReactQuill from 'react-quill';

const richTextModules = {
    toolbar: [
        ['bold', 'italic', 'strike'],
        ['link', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ size: ['small', false, 'large', 'huge'] }],
    ],
    // cursors: true,
    history: {
        userOnly: true
    }
};
const formats = ['bold', 'italic', 'strike', 'blockquote', 'link', 'list', 'bullet', 'size'];

export default function RichTextEditor({ name, onChange, ...props }: any, ref: any) {
    const quillRef = useRef(null);
    const [value, setValue] = useState('');
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
                ref={null}
                // {...props}
                render={({ field: { onChange: onChangeValue } }) => (
                    <ReactQuill
                        // @ts-ignore 
                        ref={quillRef}
                        theme="snow"
                        value={value}
                        onChange={setValue}
                        // onChange={(value: any) => {
                        //     console.info("value", value);
                        //     const newValue = value;

                        //     // Update react-hook-form's internal value
                        //     onChangeValue(newValue);

                        //     // Invoke original onChange method
                        //     if (onChange) {
                        //         onChange({ [name]: newValue });
                        //     }
                        // }}
                        placeholder={"Enter here."}
                        modules={richTextModules}
                        formats={formats}
                    // readOnly={elementProps.disabled}
                    // bounds={'.my-editor-container'}
                    />
                )}
            />
            {errors?.[name]?.message ? (
                <span className="text-xs text-red-800 pt-0">{errors?.[name]?.message}</span>
            ) : null}
        </>
    );
}

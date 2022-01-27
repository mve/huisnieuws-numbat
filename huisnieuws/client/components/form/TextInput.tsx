import React from 'react';

type Props = {
  value: string,
  name: string,
  label: string,
  placeholder: string,
  instruction: string,
  onChange: Function,
  classes: string | null,
}

const TextInput: React.FC<Props> = ({
  value,
  name,
  label,
  placeholder,
  instruction = null,
  onChange,
  classes,
}) => (
  <div className="flex flex-col last mb-5">
    <label
      htmlFor={name}
      className="text-left font-medium text-gray-800"
    >
      {label}
    </label>
    <input
      value={value}
      type="text"
      name={name}
      id={name}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={`input-default ${classes}`}
    />
    <label htmlFor={name} className="standard_subtext_input mt-2">
      {instruction}
    </label>
  </div>
);

export default TextInput;

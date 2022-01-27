import React from 'react';

type Props = {
  value: string,
  name: string,
  label: string,
  placeholder: string,
  onChange: Function,
  maxLength?: number
}

const TextAreaInput: React.FC<Props> = ({
  value,
  name,
  label,
  placeholder,
  onChange,
  maxLength,
}) => (
  <div className="flex flex-col last mb-4 overflow-hidden">
    <label
      htmlFor={name}
      className="text-left font-medium text-gray-800"
    >
      {label}
    </label>
    <textarea
      value={value}
      name={name}
      id={name}
      placeholder={placeholder}
      maxLength={maxLength}
      onChange={(e) => onChange(e.target.value)}
      className="input-textarea-default"
    />
  </div>
);

TextAreaInput.defaultProps = {
  maxLength: null,
};

export default TextAreaInput;

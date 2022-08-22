import * as React from 'react';
import { Input } from 'antd';

import './floating.scss'

interface IFloatingLabelInputProps {
  name: string
  value: any
  label: string
  onChange: any
}

const FloatingLabelInput: React.FunctionComponent<IFloatingLabelInputProps> = ({ name, value, label, onChange }) => {
  return (
    <div className='form'>
      <div className='form-control'>
        <Input type="text" name={name} id={name} className="form-input" placeholder="none" value={value} onChange={onChange} />
        <label htmlFor={name} className="form-label">{label}</label>
      </div>
    </div>
  );
};

export default FloatingLabelInput;

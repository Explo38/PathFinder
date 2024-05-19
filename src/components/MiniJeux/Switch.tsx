// src/components/Switch/Switch.tsx
import React from 'react';
import './Switch.css';

type SwitchProps = {
  isOn: boolean;
  handleToggle: () => void;
  onColor: string;
};

const Switch: React.FC<SwitchProps> = ({ isOn, handleToggle, onColor }) => {
  return (
    <div className="switch-container">
      <input
        checked={isOn}
        onChange={handleToggle}
        className="switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
      />
      <label
        style={{ background: isOn ? onColor : '' }}
        className="switch-label"
        htmlFor={`react-switch-new`}
      >
        <span className={`switch-button`} />
      </label>
    </div>
  );
};

export default Switch;

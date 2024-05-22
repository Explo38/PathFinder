import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './Switch.css';
const Switch = ({ isOn, handleToggle, onColor }) => {
    return (_jsxs("div", { className: "switch-container", children: [_jsx("input", { checked: isOn, onChange: handleToggle, className: "switch-checkbox", id: `react-switch-new`, type: "checkbox" }), _jsx("label", { style: { background: isOn ? onColor : '' }, className: "switch-label", htmlFor: `react-switch-new`, children: _jsx("span", { className: `switch-button` }) })] }));
};
export default Switch;

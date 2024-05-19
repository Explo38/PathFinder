import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Overlay, PopupContainer, PopupImage, CloseButton, InstructionText } from './Popup.styles';
import Robot_detourer from './asset/robot_detourer.png';
const Popup = ({ isVisible, onClose, imageSrc, instructions }) => {
    if (!isVisible)
        return null;
    return (_jsx(Overlay, { children: _jsxs(PopupContainer, { children: [_jsx(CloseButton, { onClick: onClose, children: "\u00D7" }), _jsx(PopupImage, { src: Robot_detourer, alt: "Vue 3D" }), _jsx(InstructionText, { children: instructions })] }) }));
};
export default Popup;

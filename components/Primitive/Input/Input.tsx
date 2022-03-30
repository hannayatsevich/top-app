import {InputProps} from "./Input.props";
import styles from './Input.module.css';
import classnames from "classnames";

export const Input = ({isEditable = true, className, ...props}: InputProps):JSX.Element => {
    return (
        <input className={classnames(className, styles.input)} {...props} disabled={!isEditable}/>
    );
};
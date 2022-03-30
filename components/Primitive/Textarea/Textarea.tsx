import {TextareaProps} from "./Textarea.props";
import styles from './Textarea.module.css';
import classnames from "classnames";

export const Textarea = ({isEditable = true, className, ...props}: TextareaProps):JSX.Element => {
    return (
        <textarea className={classnames(className, styles.textarea)} {...props} disabled={!isEditable}/>
    );
};
import {ParagraphProps} from "./Paragraph.props";
import styles from './Paragraph.module.css';
import classnames from "classnames";

export const Paragraph = ({size = 'm', children, className, ...props}: ParagraphProps):JSX.Element => {
    return (
        <p className={classnames(className, styles.p,  styles[`p-${size}`])} {...props}>
            {children}
        </p>
    );
};
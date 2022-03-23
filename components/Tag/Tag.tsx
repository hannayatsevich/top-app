import {TagProps} from "./Tag.props";
import styles from './Tag.module.css';
import classnames from "classnames";

export const Tag = ({size = 's', color = 'ghost', href, children, className, ...props}: TagProps):JSX.Element => {
    return (
        <div className={classnames(className, styles.tag, styles[`tag-${size}`], styles[`tag-${color}`])} {...props}>
            {href ? <a href={href}>{children}</a> : children}
        </div>
    );
};
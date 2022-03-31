import styles from './Card.module.css';
import classnames from "classnames";
import {CardProps} from "./Card.props";
import {ForwardedRef, forwardRef} from "react";

export const Card = forwardRef(({color = 'white', className, children, ...props}: CardProps, ref: ForwardedRef<HTMLDivElement>):JSX.Element => {
    return (
        <div className={classnames(className, styles.card, styles[`card-${color}`])} {...props} ref={ref}>
            {children}
        </div>
    );
});
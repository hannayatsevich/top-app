import classnames from "classnames";
import {ForwardedRef, forwardRef} from "react";
import styles from './Card.module.css';
import {CardProps} from "./Card.props";

export const Card = forwardRef(({color = 'white', className, children, ...props}: CardProps, ref: ForwardedRef<HTMLDivElement>):JSX.Element => {
    return (
        <div className={classnames(className, styles.card, styles[`card-${color}`])} {...props} ref={ref}>
            {children}
        </div>
    );
});

Card.displayName = 'Card';
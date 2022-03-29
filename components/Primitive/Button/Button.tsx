import {ButtonProps} from "./Button.props";
import classnames from "classnames";
import styles from './Button.module.css';
import ArrowIcon from './arrow.svg';

export const Button = ({styleType = 'primary', arrow = 'none', children, className, ...props}: ButtonProps):JSX.Element => {
    return (
        <button
            {...props}
            className={classnames(styles.button, className, {
                [styles.primary]: styleType === 'primary',
                [styles.ghost]: styleType === 'ghost'
            })}
        >
            {children}
            {arrow !== 'none' && <span className={classnames(styles.arrow, {
                [styles['arrow-down']]: arrow === 'down',
                [styles['arrow-right']]: arrow === 'right'
            })}>
                <ArrowIcon  />
            </span>}
        </button>
    );
};
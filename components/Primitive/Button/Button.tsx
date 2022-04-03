import {ButtonProps} from "./Button.props";
import classnames from "classnames";
import styles from './Button.module.css';
import ArrowIcon from './arrow.svg';
import {motion} from "framer-motion";

export const Button = ({styleType = 'primary', arrow = 'none', children, className, ...props}: ButtonProps):JSX.Element => {

    return (
        <motion.button
            whileHover={{
                scale: 1.04
            }}
            className={classnames(className, styles.button, {
                [styles.primary]: styleType === 'primary',
                [styles.ghost]: styleType === 'ghost'
            })}
            {...props}
        >
            {children}
            {arrow !== 'none' && <span className={classnames(styles.arrow, {
                [styles['arrow-down']]: arrow === 'down',
                [styles['arrow-right']]: arrow === 'right'
            })}>
                <ArrowIcon  />
            </span>}
        </motion.button>
    );
};
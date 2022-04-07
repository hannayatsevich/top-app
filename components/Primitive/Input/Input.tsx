import classnames from "classnames";
import React, {ForwardedRef, forwardRef} from "react";
import {InputProps} from "./Input.props";
import styles from './Input.module.css';

export const Input = forwardRef(({isEditable = true, error, className, ...props}: InputProps, ref: ForwardedRef<HTMLInputElement>):JSX.Element => {
    return (
        <div className={classnames(className, styles['input-wrapper'])}>
            <input
                className={classnames(styles.input, {
                    [styles['input-error']]: !!error
                })}
                disabled={!isEditable}
                ref={ref}
                {...props}
            />
            {!!error && !!error.message && <div className={styles.error} role={'alert'}>{error.message}</div>}
        </div>
    );
});

Input.displayName = 'Input';
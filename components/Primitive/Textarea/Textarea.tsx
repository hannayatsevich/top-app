import classnames from "classnames";
import React, {ForwardedRef, forwardRef} from "react";
import {TextareaProps} from "./Textarea.props";
import styles from './Textarea.module.css';

export const Textarea = forwardRef(({isEditable = true, error, className, ...props}: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>):JSX.Element => {
    return (
        <div className={classnames(className, styles['textarea-wrapper'])}>
            <textarea
                className={classnames(styles.textarea, {
                    [styles['textarea-error']]: !!error
                })}
                disabled={!isEditable}
                ref={ref}
                {...props}
            />
            {!!error && !!error.message && <div className={styles.error} role={'alert'}>{error.message}</div>}
        </div>
    );
});

Textarea.displayName = 'Textarea';
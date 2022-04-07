import classnames from "classnames";
import {ButtonIconProps, icons} from "./ButtonIcon.props";
import styles from './ButtonIcon.module.css';

export const ButtonIcon = ({styleType = 'primary', icon = 'close', className, ...props}: ButtonIconProps):JSX.Element => {
    const IconComponent = icons[icon];
    return (
        <button
            {...props}
            className={classnames(className, styles.button, {
                [styles.primary]: styleType === 'primary',
                [styles.white]: styleType === 'white'
            })}
        >
            <IconComponent className={styles.icon}/>
        </button>
    );
};
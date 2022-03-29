import styles from './Card.module.css';
import classnames from "classnames";
import {CardProps} from "./Card.props";

export const Card = ({color = 'white', className, children, ...props}: CardProps):JSX.Element => {
    return (
        <div className={classnames(className, styles.card, styles[`card-${color}`])} {...props}>
            {children}
        </div>
    );
};
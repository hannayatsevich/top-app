import {HtagProps} from "./Htag.props";
import classnames from "classnames";
import styles from './Htag.module.css';

export const Htag = ({tag, children, className}: HtagProps):JSX.Element => {
    const Heading = tag as keyof JSX.IntrinsicElements;
    return (
        <Heading className={classnames(className, styles[tag.toUpperCase()])}>{children}</Heading>
    );
};
import styles from './Review.module.css';
import classnames from "classnames";
import {ReviewProps} from "./Review.props";
import {getRuDate} from "../../../helpers";
import {Rating, Divider} from "../../../components";
import UserIcon from '../../../public/help-icons/user.svg';

export const Review = ({review, className, ...props}: ReviewProps):JSX.Element => {
    const {name, title, createdAt, rating, description} = review;

    return (
        <div className={classnames(className, styles.review)} {...props}>
            <UserIcon className={styles.icon}/>
            <div className={styles.title}>
                <span className={styles.name}>{name}:&nbsp;&nbsp;</span>
                <span>{title}</span>
            </div>
            <div className={styles.date}>{getRuDate(new Date(createdAt))}</div>
            <Rating className={styles.rating} rating={rating}/>
            <div className={styles.description}>{description}</div>
            <Divider className={styles.divider}/>
        </div>
    );
};
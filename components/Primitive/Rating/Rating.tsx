import {RatingProps} from "./Rating.props";
import StarIcon from "./star.svg";
import styles from './Rating.module.css';
import classnames from "classnames";
import React, {Fragment, useEffect, useState, KeyboardEvent, forwardRef, ForwardedRef} from "react";

export const Rating = forwardRef(({isEditable = false, rating, setRating, error, className, ...props}: RatingProps, ref: ForwardedRef<HTMLDivElement>):JSX.Element => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

    const constructRating = (currentRating: number):void => {
        const updatedArray = ratingArray.map((ratingElement: JSX.Element, index: number) => (
            <span
                key={index}
                className={classnames(styles.star, {
                    [styles.filled]: index < currentRating,
                    [styles.editable]: isEditable
                })}
                onMouseEnter={():void => {isEditable && constructRating(index + 1);}}
                onMouseLeave={():void => {isEditable && constructRating(rating);}}
                onClick={():void => {isEditable && setRating && setRating(index + 1);}}
                onKeyDown={(e:KeyboardEvent<HTMLSpanElement>):void => {isEditable && setRating && e.code !== 'Space' && setRating(index + 1);}}
            >
                <StarIcon
                    tabIndex={isEditable ? 0 : -1}
                />
            </span>

            )
        );
        setRatingArray(updatedArray);
    };
    
    useEffect(() => {
        constructRating(rating);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rating]);

    return (
        <div
            className={classnames(className, styles.rating, {
                [styles['rating-error']]: !!error
            })}
            ref={ref}
            {...props}
        >
            {ratingArray.map((ratingElement: JSX.Element, index: number) => <Fragment key={index}>{ratingElement}</Fragment>)}
            {!!error && !!error.message && <div className={styles.error}>{error.message}</div>}
        </div>
    );
});
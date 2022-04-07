import classnames from "classnames";
import React, {Fragment, useEffect, useState, KeyboardEvent, forwardRef, ForwardedRef, useRef} from "react";
import {RatingProps} from "./Rating.props";
import StarIcon from "./star.svg";
import styles from './Rating.module.css';

export const Rating = forwardRef(({isEditable = false, rating, setRating, error, errors, className, tabIndex, ...props}: RatingProps, ref: ForwardedRef<HTMLDivElement>):JSX.Element => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));
    const starsArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

    const handleKeyCode = (e:KeyboardEvent<HTMLOrSVGElement>): void => {
        if(!setRating || !isEditable) return;

        if(e.code === 'ArrowRight' || e.code === 'ArrowUp') {
            e.preventDefault();
            let newRating = 1;
            if(rating) {
                newRating = rating < 5 ? rating + 1 : 5;
            }
            setRating(newRating);
            starsArrayRef.current[rating]?.focus({preventScroll: true});
        }
        if(e.code === 'ArrowLeft' || e.code === 'ArrowDown') {
            e.preventDefault();
            let newRating = 1;
            if(rating) {
                newRating = rating > 1 ? rating - 1 : 1;
            }
            setRating(newRating);
            starsArrayRef.current[rating - 2]?.focus({preventScroll: true});
        }
    };

    const setTabIndex = (currentRating: number, elementIndex: number): number => {
        if(!isEditable) return -1;

        if(!currentRating && elementIndex === 0 || currentRating && currentRating === elementIndex + 1)
            return tabIndex ?? 0;

        return -1;
    };

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
                tabIndex={setTabIndex(rating, index)}
                onKeyDown={handleKeyCode}
                ref={(ref): void => {starsArrayRef.current?.push(ref);}}
                role={isEditable ? 'slider' : ''}
                aria-label={isEditable && !rating ? 'Укажите рейтинг кнопками вверх или вниз' : `рейтинг ${rating}`}
                aria-valuenow={rating}
                aria-valuemin={0}
                aria-valuemax={1}
                aria-invalid={!!error}
            >
                <StarIcon />
            </span>

            )
        );
        setRatingArray(updatedArray);
    };
    
    useEffect(() => {
        constructRating(rating);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rating, tabIndex]);

    useEffect(() => {
        if(errors?.rating && Object.keys(errors).length === 1 && starsArrayRef.current[0]?.tabIndex === 0) {
            starsArrayRef.current[0]?.focus();
        }

    }, [errors, errors?.rating]);

    return (
        <div
            className={classnames(className, styles.rating, {
                [styles['rating-error']]: !!error
            })}
            ref={ref}
            {...props}
        >
            {ratingArray.map((ratingElement: JSX.Element, index: number) => <Fragment key={index}>{ratingElement}</Fragment>)}
            {!!error && !!error.message && <div className={styles.error} role={'alert'}>{error.message}</div>}
        </div>
    );
});

Rating.displayName = 'Rating';
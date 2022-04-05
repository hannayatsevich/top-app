import {DetailedHTMLProps, HTMLAttributes} from "react";
import {FieldError} from "react-hook-form";
import {FieldErrors} from "react-hook-form/dist/types/errors";
import {IReviewForm} from "../ReviewForm/ReviewForm.interface";

export interface RatingProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    isEditable?: boolean;
    rating: number;
    setRating?: (rating: number) => void
    error?: FieldError
    errors?: FieldErrors<IReviewForm>
}
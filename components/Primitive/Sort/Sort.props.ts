import {DetailedHTMLProps, HTMLAttributes} from "react";

export interface SortProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    sort: SortEnum;
    setSort: (sort: PureSortEnum) => void;
}

export enum SortEnum {
    Rating,
    Price,
    Reset
}

export type PureSortEnum = Exclude<SortEnum, SortEnum.Reset>; //divide with payload/without
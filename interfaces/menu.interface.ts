import {TopLevelCategory} from "./page.interface";
import {ReactNode} from "react";

export interface IPageItem {
    alias: string;
    title: string;
    _id: string;
    category: string;
}

export interface IMenuItem {
    _id: {
        secondCategory: string;
    };
    pages: IPageItem[];
    isOpened?: boolean
}

export interface FirstLevelMenuItem {
    route: string;
    name: string;
    icon: ReactNode;
    id: TopLevelCategory;
}
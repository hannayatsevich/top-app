import {DetailedHTMLProps, HTMLAttributes} from "react";
import {IMenuItem} from "@/interfaces/menu.interface";
import {TopLevelCategory} from "@/interfaces/page.interface";

export interface CategoryPageComponentProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    categories: IMenuItem[];
    firstCategory: TopLevelCategory;
}
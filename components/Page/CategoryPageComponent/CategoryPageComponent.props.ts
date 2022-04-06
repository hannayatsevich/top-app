import {IMenuItem} from "../../../interfaces/menu.interface";
import {DetailedHTMLProps, HTMLAttributes} from "react";
import {TopLevelCategory} from "../../../interfaces/page.interface";

export interface CategoryPageComponentProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    categories: IMenuItem[];
    firstCategory: TopLevelCategory;
}
import {HTMLAttributes, DetailedHTMLProps} from "react";
import {ITopPageModel, TopLevelCategory} from "@/interfaces/page.interface";
import {IProductModel} from "@/interfaces/product.interface";

export interface TopPageComponentProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    firstCategory: TopLevelCategory;
    page: ITopPageModel;
    products: IProductModel[];
}
import {DetailedHTMLProps, HTMLAttributes} from "react";
import {IFirstCategory} from "../../../pages/search";

export interface SearchPageComponentProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    categories: IFirstCategory[];
}
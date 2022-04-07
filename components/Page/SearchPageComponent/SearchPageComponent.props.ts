import {DetailedHTMLProps, HTMLAttributes} from "react";
import {IFirstCategory} from "@/interfaces/page.interface";

export interface SearchPageComponentProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    categories: IFirstCategory[];
}
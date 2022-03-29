import {DetailedHTMLProps, HTMLAttributes} from "react";
import {ITopPageAdvantage} from "../../../interfaces/page.interface";

export interface AdvantagesProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    advantages: ITopPageAdvantage[]
}
import {DetailedHTMLProps, HTMLAttributes, ReactNode} from "react";

export interface AccordionProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>  {
    id?: string;
    controllable?: boolean;
    isOpened?: boolean;
    setStatus?: (status: boolean, id?:string) => void;
    heading: string;
    children: ReactNode;
}
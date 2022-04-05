import {ReactNode} from "react";

export interface HtagProps {
    id?: string;
    tag: 'h1' | 'h2' |'h3';
    children: ReactNode;
    className?: string
}
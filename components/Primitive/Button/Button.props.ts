import {ButtonHTMLAttributes, DetailedHTMLProps, ReactNode} from "react";

export interface ButtonProps extends
    Omit<
        DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
        'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag' | 'ref'
        > {
    styleType?: 'primary' | 'ghost';
    children: ReactNode;
    arrow?: 'right' | 'down' | 'none'
}
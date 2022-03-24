import {SidebarProps} from "./Sidebar.props";
import styles from './Sidebar.module.css';
import classnames from "classnames";
import {Menu} from "../../Menu/Menu";
import React from "react";


export const Sidebar: React.FC<SidebarProps> = ({...props}) => {
    return (
        <div {...props}>
            <Menu/>
        </div>
    );
};
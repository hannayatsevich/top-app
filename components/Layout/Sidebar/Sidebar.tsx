import classnames from "classnames";
import React from "react";
import {SidebarProps} from "./Sidebar.props";
import styles from './Sidebar.module.css';
import Logo from '@/public/logo.svg';
import {Search, Menu} from "@/components/index";


export const Sidebar: React.FC<SidebarProps> = ({className,...props}) => {
    return (
        <div className={classnames(className, styles.sidebar)} {...props}>
            <Logo/>
            <Search/>
            <Menu/>
        </div>
    );
};
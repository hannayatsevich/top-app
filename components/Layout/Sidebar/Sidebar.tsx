import {SidebarProps} from "./Sidebar.props";
import styles from './Sidebar.module.css';
import classnames from "classnames";
import {Menu} from "../../Primitive/Menu/Menu";
import React from "react";
import Logo from '../../../public/logo.svg';


export const Sidebar: React.FC<SidebarProps> = ({className,...props}) => {
    return (
        <div className={classnames(className, styles.sidebar)} {...props}>
            <Logo/>
            <div>Поиск</div>
            <Menu/>
        </div>
    );
};
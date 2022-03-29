import {MenuProps} from "./Menu.props";
import React, {useContext} from "react";
import classnames from "classnames";
import Link from "next/link";
import { useRouter } from 'next/router';
import {AppContext, IAppContext} from "../../../contexts/app.context";
import {FirstLevelMenuItem, IPageItem} from "../../../interfaces/menu.interface";
import styles from './Menu.module.css';
import {firstLevelMenu} from "../../../constants";

export const Menu: React.FC<MenuProps> = () => {
    const {menu, setMenu, firstCategory} = useContext<IAppContext>(AppContext);
    const router = useRouter();

    const openSecondMenu = (secondCategory: string): void => {
        setMenu && setMenu(menu.map(menuItem => (menuItem._id.secondCategory === secondCategory ? {...menuItem, isOpened: !menuItem.isOpened} : menuItem)));
    };
    
    const buildFirstLevelMenu = (): JSX.Element => (
        <>
            {firstLevelMenu.map(menuItem => (
                    <div key={menuItem.route}>
                        <Link href={`/${menuItem.route}`}>
                            <a>
                                <div className={classnames(styles['menu-first-level'], {
                                    [styles['menu-first-level-active']]: menuItem.id === firstCategory
                                })}>
                                    {menuItem.icon}
                                    <span>{menuItem.name}</span>
                                </div>
                            </a>
                        </Link>
                        {menuItem.id === firstCategory && buildSecondLevelMenu(menuItem)}
                    </div>
            ))}
        </>
    );
    const buildSecondLevelMenu = (menuFirstLevel: FirstLevelMenuItem): JSX.Element => (
        <div className={classnames(styles['menu-first-level-block'])}>
            {menu.map(menuItem => {
                const isThirdLevelOpened = menuItem.isOpened || menuItem.pages.some( page => router.asPath === `/${menuFirstLevel.route}/${page.alias}`);
                return (
                    <div key={menuItem._id.secondCategory}>
                        <div
                            className={classnames(styles['menu-second-level'], {
                                [styles['menu-second-level-active']]: menuItem.isOpened
                            })}
                            onClick={():void => {openSecondMenu(menuItem._id.secondCategory);}}
                        >
                            {menuItem._id.secondCategory}
                        </div>
                        {isThirdLevelOpened && buildThirdLevelMenu(menuItem.pages, menuFirstLevel.route)}
                    </div>
            );})}
        </div>
    );

    const buildThirdLevelMenu = (pages: IPageItem[], route: string): JSX.Element => (
        <div className={classnames(styles['menu-second-level-block'])}>
            {pages.map(menuItem => (
                <Link key={menuItem._id} href={`/${route}/${menuItem.alias}`}>
                    <a
                        className={classnames(styles['menu-third-level'], {
                            [styles['menu-third-level-active']]: router.asPath === `/${route}/${menuItem.alias}`
                        })}
                    >
                        {menuItem.category}
                    </a>
                </Link>
            ))}
        </div>
    );

    return (
        <div className={styles.menu}>
            {buildFirstLevelMenu()}
        </div>
    );
};
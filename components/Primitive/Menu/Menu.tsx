import {MenuProps} from "./Menu.props";
import React, {useContext} from "react";
import classnames from "classnames";
import Link from "next/link";
import { useRouter } from 'next/router';
import {AppContext, IAppContext} from "../../../contexts/app.context";
import {FirstLevelMenuItem, IPageItem} from "../../../interfaces/menu.interface";
import styles from './Menu.module.css';
import {firstLevelMenu} from "../../../constants";
import {motion} from "framer-motion";

export const Menu: React.FC<MenuProps> = () => {
    const {menu, setMenu, firstCategory} = useContext<IAppContext>(AppContext);
    const router = useRouter();

    const variantsSecondLevel = {
        visible: {
            marginBottom: 10,
            transition: {
                when: 'beforeChildren',
                staggerChildren: 0.1
            }
        },
        hidden: {
            marginBottom: 0,
        }
    };

    const variantsThirdLevel = {
        visible: {
            opacity: 1,
            maxHeight: 58
        },
        hidden: {
            opacity: 0,
            maxHeight: 0
        }
    };

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
                const isThirdLevelOpened = menuItem.isOpened || menuItem.pages.some( page => router.asPath.split('#')[0] === `/${menuFirstLevel.route}/${page.alias}`);
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
                        <motion.div
                            layout
                            variants={variantsSecondLevel}
                            initial={isThirdLevelOpened ? 'visible' : 'hidden'}
                            animate={isThirdLevelOpened ? 'visible' : 'hidden'}
                            className={classnames(styles['menu-second-level-block'])}
                        >
                            {buildThirdLevelMenu(menuItem.pages, menuFirstLevel.route, isThirdLevelOpened)}
                        </motion.div>

                    </div>
            );})}
        </div>
    );

    const buildThirdLevelMenu = (pages: IPageItem[], route: string, isOpened: boolean): JSX.Element => (
        <>
            {pages.map(menuItem => (
                <motion.div
                    key={menuItem._id}
                    variants={variantsThirdLevel}
                >
                    <Link href={`/${route}/${menuItem.alias}`}>
                        <a
                            tabIndex={isOpened ? 0 : -1}
                            className={classnames(styles['menu-third-level'], {
                                [styles['menu-third-level-active']]: router.asPath.split('#')[0] === `/${route}/${menuItem.alias}`
                            })}
                        >
                            {menuItem.category}
                        </a>
                    </Link>
                </motion.div>
            ))}
        </>
    );

    return (
        <div className={styles.menu}>
            {buildFirstLevelMenu()}
        </div>
    );
};
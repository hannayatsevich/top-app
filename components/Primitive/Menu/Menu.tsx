import {MenuProps} from "./Menu.props";
import React, {useContext, KeyboardEvent, useState} from "react";
import classnames from "classnames";
import Link from "next/link";
import { useRouter } from 'next/router';
import {AppContext, IAppContext} from "../../../contexts/app.context";
import {FirstLevelMenuItem, IPageItem} from "../../../interfaces/menu.interface";
import styles from './Menu.module.css';
import {firstLevelMenu} from "../../../constants";
import {motion, useReducedMotion} from "framer-motion";

export const Menu: React.FC<MenuProps> = () => {
    const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined >();
    const {menu, setMenu, firstCategory} = useContext<IAppContext>(AppContext);
    const router = useRouter();
    const reducedMotion = useReducedMotion();

    const variantsSecondLevel = {
        visible: {
            marginBottom: 10,
            transition: reducedMotion ? {} : {
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
            opacity: reducedMotion ? 1 : 0,
            maxHeight: 0
        }
    };

    const openSecondMenu = (secondCategory: string): void => {
        setMenu && setMenu(menu.map(menuItem => (menuItem._id.secondCategory === secondCategory ? {...menuItem, isOpened: !menuItem.isOpened} : menuItem)));
    };

    const openSecondMenuByKey = (event: KeyboardEvent, secondCategory: string): void => {
        if(event.code === 'Enter' || event.code === 'Space') {
            event.preventDefault(); // иначе происходит скролл при нажатии space
            openSecondMenu(secondCategory);
        }
    };
    
    const buildFirstLevelMenu = (): JSX.Element => (
        <ul className={styles['menu-wrapper']}>
            {firstLevelMenu.map(menuItem => (
                    <li key={menuItem.route} className={styles['menu-item']} aria-expanded={menuItem.id === firstCategory}>
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
                    </li>
            ))}
        </ul>
    );
    const buildSecondLevelMenu = (menuFirstLevel: FirstLevelMenuItem): JSX.Element => (
        <ul className={classnames(styles['menu-first-level-block'], styles['menu-wrapper'])}>
            {menu.map(menuItem => {
                const isThirdLevelOpened = menuItem.isOpened || menuItem.pages.some( page => router.asPath.split('#')[0] === `/${menuFirstLevel.route}/${page.alias}`);
                return (
                    <li key={menuItem._id.secondCategory} className={styles['menu-item']}>
                        <button
                            tabIndex={0}
                            className={classnames(styles['menu-second-level'])}
                            onClick={():void => {
                                openSecondMenu(menuItem._id.secondCategory);
                                setAnnounce(isThirdLevelOpened ? 'closed' : 'opened');
                            }}
                            onKeyDown={(event: KeyboardEvent): void => {
                                openSecondMenuByKey(event, menuItem._id.secondCategory);
                                setAnnounce(isThirdLevelOpened ? 'closed' : 'opened');
                            }}
                            aria-expanded={isThirdLevelOpened}
                        >
                            {menuItem._id.secondCategory}
                        </button>
                        <motion.ul
                            layout={!!reducedMotion}
                            variants={variantsSecondLevel}
                            initial={isThirdLevelOpened ? 'visible' : 'hidden'}
                            animate={isThirdLevelOpened ? 'visible' : 'hidden'}
                            className={classnames(styles['menu-second-level-block'], styles['menu-wrapper'])}
                        >
                            {buildThirdLevelMenu(menuItem.pages, menuFirstLevel.route, isThirdLevelOpened)}
                        </motion.ul>

                    </li>
            );})}
        </ul>
    );

    const buildThirdLevelMenu = (pages: IPageItem[], route: string, isOpened: boolean): JSX.Element => (
        <>
            {pages.map(menuItem => (
                <motion.li
                    className={styles['menu-item']}
                    key={menuItem._id}
                    variants={variantsThirdLevel}
                >
                    <Link href={`/${route}/${menuItem.alias}`}>
                        <a
                            tabIndex={isOpened ? 0 : -1}
                            className={classnames(styles['menu-third-level'], {
                                [styles['menu-third-level-active']]: router.asPath.split('#')[0] === `/${route}/${menuItem.alias}`
                            })}
                            aria-current={router.asPath.split('#')[0] === `/${route}/${menuItem.alias}` ? 'page' : false}
                        >
                            {menuItem.category}
                        </a>
                    </Link>
                </motion.li>
            ))}
        </>
    );

    return (
        <nav className={styles.menu} role={'navigation'}>
            {announce && <span className={'hidden-element'} role={'log'}>{announce === 'opened' ? 'Развернуто' : 'Свернуто'}</span>}
            {buildFirstLevelMenu()}
        </nav>
    );
};
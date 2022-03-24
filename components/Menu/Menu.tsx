import {MenuProps} from "./Menu.props";
import React, {useContext, useState} from "react";
import classnames from "classnames";
import {AppContext, IAppContext} from "../../contexts/app.context";
import {FirstLevelMenuItem, IPageItem} from "../../interfaces/menu.interface";
import BooksIcon from "../../public/icons/books.svg";
import CoursesIcon from "../../public/icons/courses.svg";
import ProductsIcon from "../../public/icons/products.svg";
import ServicesIcon from "../../public/icons/services.svg";
import {TopLevelCategory} from "../../interfaces/page.interface";
import styles from './Menu.module.css';

const firstLevelMenu: FirstLevelMenuItem[] = [
    {route: 'courses', name: 'Курсы', icon: <CoursesIcon/>, id: TopLevelCategory.Courses},
    {route: 'services', name: 'Сервисы', icon: <ServicesIcon/>, id: TopLevelCategory.Services},
    {route: 'books', name: 'Книги', icon: <BooksIcon/>, id: TopLevelCategory.Books},
    {route: 'products', name: 'Товары', icon: <ProductsIcon/>, id: TopLevelCategory.Products},
];

export const Menu: React.FC<MenuProps> = () => {
    const {menu, setMenu, firstCategory} = useContext<IAppContext>(AppContext);
    
    const buildFirstLevelMenu = (): JSX.Element => (
        <>
            {firstLevelMenu.map(menuItem => (
                    <div key={menuItem.id}>
                        <a href={`/${menuItem.route}`}>
                            <div className={classnames(styles['menu-first-level'], {
                                [styles['menu-first-level-active']]: menuItem.id === firstCategory
                            })}>
                                {menuItem.icon}
                                <span>{menuItem.name}</span>
                            </div>
                        </a>
                        {menuItem.id === firstCategory && buildSecondLevelMenu(menuItem)}
                    </div>
            ))}
        </>
    );
    const buildSecondLevelMenu = (menuFirstLevel: FirstLevelMenuItem): JSX.Element => (
        <div className={classnames(styles['menu-first-level-block'])}>
            {menu.map(menuItem => (
                <div key={menuItem._id.secondCategory}>
                    <div className={classnames(styles['menu-second-level'], {
                        [styles['menu-second-level-active']]: menuItem.isOpened
                    })}>
                        {menuItem._id.secondCategory}
                    </div>
                    {menuItem.isOpened && buildThirdLevelMenu(menuItem.pages, menuFirstLevel.route)}
                </div>)
            )}
        </div>
    );

    const buildThirdLevelMenu = (pages: IPageItem[], route: string): JSX.Element => (
        <div className={classnames(styles['menu-second-level-block'])}>
            {pages.map(menuItem => (
                <a
                    className={classnames(styles['menu-third-level'], {
                        [styles['menu-third-level-active']]: false //todo
                    })}
                    key={menuItem._id}
                    href={`/${route}/${menuItem.alias}`}
                >
                    {menuItem.category}
                </a>
            ))}
        </div>
    );

    return (
        <div className={styles.menu}>
            {buildFirstLevelMenu()}
        </div>
    );
};
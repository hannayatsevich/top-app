import React, {useState} from "react";
import Link from 'next/link';
import {CategoryPageComponentProps} from "./CategoryPageComponent.props";
import styles from './CategoryPageComponent.module.css';
import {Accordion, Htag} from "@/components/index";
import {firstLevelMenu} from "@/constants/index";

export const CategoryPageComponent: React.FC<CategoryPageComponentProps> = ({categories, firstCategory}) => {
    const firstLevelMenuItem = firstLevelMenu.find( menu => menu.id === firstCategory);
    const [accordionOpenedArray, setAccordionOpenedArray] = useState<string[]>([]);

    const handleAccordionStatus = (status, id): void => {
        if(status && accordionOpenedArray.indexOf(id) === -1) {
            setAccordionOpenedArray([...accordionOpenedArray, id]);
        }
        if(!status && accordionOpenedArray.indexOf(id) !== -1) {
            setAccordionOpenedArray(accordionOpenedArray.filter(item => item !== id));
        }

    };

    return (
        <div>
            { !!firstLevelMenuItem?.name && <Htag tag={'h1'} className={styles.title}>{firstLevelMenuItem.name}</Htag>}
            { categories.map(category =>
                <Accordion
                    key={category._id.secondCategory}
                    heading={category._id.secondCategory}
                    controllable
                    id={category._id.secondCategory}
                    isOpened={accordionOpenedArray.indexOf(category._id.secondCategory) !== -1}
                    setStatus={handleAccordionStatus}
                >
                <ul className={styles['categories-list']}>
                    {category.pages.map(page => <li className={styles['category-item']} key={page._id}>
                        <Link href={firstLevelMenuItem?.name ? `/${firstLevelMenuItem.route}/${page.alias}` : ''}>
                            <a tabIndex={accordionOpenedArray.indexOf(category._id.secondCategory) !== -1 ? 0 : -1}>{page.category}</a>
                        </Link>
                    </li>)}
                </ul>
            </Accordion>)}
        </div>
    );
};
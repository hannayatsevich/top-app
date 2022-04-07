import React, {useEffect, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import styles from './SearchPageComponent.module.css';
import {SearchPageComponentProps} from "./SearchPageComponent.props";
import {Htag, Button} from "@/components/index";
import {getWord} from "@/helpers/index";
import {firstLevelMenu} from "@/constants/index";

interface ISearchResult {
    title: string;
    link: string;
    id: string;
}

const findMatches = (categories, queryString): ISearchResult[] => {
    if(!queryString) {
        return  [];
    }

    return categories.flatMap(category => {
        const firstLevelMenuItem = firstLevelMenu.find( menu => menu.id === category.firstCategory);
        if(!firstLevelMenuItem) {
            return  [];
        }

        return category.menu.flatMap( menuItem => menuItem.pages
            .filter(page => page.category.toLowerCase().indexOf(queryString.toLowerCase()) > -1)
            .map(page => ({title: page.category, link: `/${firstLevelMenuItem.route}/${page.alias}`, id: page._id})));
    });
};

export const SearchPageComponent: React.FC<SearchPageComponentProps> = ({categories}) => {
    const {query: {q = ''}} = useRouter();
    const [searchResults, setSearchResults] = useState<ISearchResult[]>([]);
    
    useEffect(() => {
        setSearchResults(findMatches(categories, q));
    }, [categories, q]);

    return (
        <div>
            <Htag tag={'h1'} className={styles.title}>Поиск</Htag>
            <div  className={styles.description} dangerouslySetInnerHTML={{__html:
                    searchResults.length
                        ? `По запросу <span class="${styles['text-bold']}">${q}</span> ${getWord(searchResults.length, ['найдена', 'найдены', 'найдено'])} <span class="${styles['text-bold']}">${searchResults.length} ${getWord(searchResults.length, ['страница', 'страницы', 'страниц'])}</span>.`
                        : 'По вашему запросу ничего не найдено.'
            }}/>
            { !!searchResults.length && <ul className={styles['search-list']}>
                    {searchResults.map(({id, title, link}) => <li key={id} className={styles['search-list-item']} tabIndex={0}>
                        <span>{title}</span>
                        <Link href={link}><a tabIndex={-1}><Button>Перейти</Button></a></Link>
                    </li>)}
                </ul>
            }

        </div>
    );
};
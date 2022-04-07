import {useEffect, useReducer} from "react";
import {useReducedMotion} from "framer-motion";
import {TopPageComponentProps} from "./TopPageComponent.props";
import styles from './TopPageCompoent.module.css';
import {TopLevelCategory} from "@/interfaces/page.interface";
import {Product, Sort, Htag, Tag, HhData, Advantages} from "@/components/index";
import {PureSortEnum, SortEnum} from "@/components/Primitive/Sort/Sort.props";
import {sortReducer} from "@/components/Primitive/Sort/sort.reducer";


export const TopPageComponent = ({page, products, firstCategory}: TopPageComponentProps):JSX.Element => {
    const {title, hh, advantages = [], category, tags, seoText} = page;

    const [{sort, products: sortedProducts}, dispatch] = useReducer(sortReducer, {sort: SortEnum.Reset, products: products || []});
    const reducedMotion = useReducedMotion();
    
    const setSortValue = (sort: PureSortEnum): void => {
        dispatch({type: sort});
    };

    useEffect(() => {
        dispatch({type: SortEnum.Reset, payload: products});
    }, [products]);

    return (
        <div>
            <div className={styles.header}>
                <Htag tag={'h1'}>{title}</Htag>
                {products && <Tag size={'m'} color={'grey'} aria-label={products.length + 'элементов'}>{products.length}</Tag>}
                <Sort sort={sort} setSort={setSortValue}/>
            </div>
            <div role={'list'}>
                {sortedProducts.map(product => <Product key={product._id} product={product} layout={!reducedMotion}/>)}
            </div>
            {firstCategory === TopLevelCategory.Courses && hh && <>
                <div className={styles['hh-header']}>
                    <Htag tag={'h2'}>{`Вакансии - ${category}`}</Htag>
                    <Tag size={'m'} color={'red'}>hh.ru</Tag>
                </div>
                <HhData {...hh}/>
            </>}
            {!!advantages.length && (
                <>
                    <Htag tag={'h2'}>Преимущества</Htag>
                    <Advantages advantages={advantages}/>
                </>
            )}
            {seoText && <div className={styles['seo-text']} dangerouslySetInnerHTML={{__html: seoText}}/>}
            {firstCategory === TopLevelCategory.Courses && <>
                <Htag tag={'h2'}>Получаемые навыки</Htag>
                <div className={styles.tags}>
                    {tags.map(tag => <Tag key={tag} size={'s'} color={'primary'}>{tag}</Tag>)}
                </div>
            </>}
        </div>
    );
};
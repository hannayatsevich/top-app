import {TopPageComponentProps} from "./TopPageComponent.props";
import {Htag} from "../../Primitive/Htag/Htag";
import {Tag} from "../../Primitive/Tag/Tag";
import styles from './TopPageCompoent.module.css';
import {HhData} from "../../Primitive/HhData/HhData";
import {TopLevelCategory} from "../../../interfaces/page.interface";
import {Advantages} from "../../Primitive/Advantages/Advantages";
import {Sort} from "../../../components";
import {SortEnum} from "../../Primitive/Sort/Sort.props";
import {useReducer} from "react";
import {sortReducer} from "../../Primitive/Sort/sort.reducer";


export const TopPageComponent = ({page, products, firstCategory}: TopPageComponentProps):JSX.Element => {
    const {title, hh, advantages = [], category, tags, seoText} = page;

    const [{sort, products: sortedProducts}, dispatch] = useReducer(sortReducer, {sort: SortEnum.Rating, products:  products || []});
    
    const setSortValue = (sort: SortEnum): void => {
        dispatch({type: sort});
    };

    return (
        <div>
            <div className={styles.header}>
                <Htag tag={'h1'}>{title}</Htag>
                {products && <Tag size={'m'} color={'grey'}>{products.length}</Tag>}
                <Sort sort={sort} setSort={setSortValue}/>
            </div>
            <div>
                {sortedProducts.map(product => <div key={product._id}>{product.title}</div>)}
            </div>
            <div className={styles['hh-header']}>
                <Htag tag={'h2'}>{`Вакансии - ${category}`}</Htag>
                <Tag size={'m'} color={'red'}>hh.ru</Tag>
            </div>
            {firstCategory === TopLevelCategory.Courses && hh && <HhData {...hh}/>}
            {!!advantages.length && (
                <>
                    <Htag tag={'h2'}>Преимущества</Htag>
                    <Advantages advantages={advantages}/>
                </>
            )}
            {seoText && <div className={styles['seo-text']} dangerouslySetInnerHTML={{__html: seoText}}/>}
            <Htag tag={'h2'}>Получаемые навыки</Htag>
            <div className={styles.tags}>
                {tags.map(tag => <Tag key={tag} size={'s'} color={'primary'}>{tag}</Tag>)}
            </div>
        </div>
    );
};
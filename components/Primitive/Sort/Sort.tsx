import classnames from "classnames";
import styles from './Sort.module.css';
import {SortEnum, SortProps} from "./Sort.props";
import SortIcon from './sort.svg';

export const Sort = ({sort, setSort, className, ...props}: SortProps):JSX.Element => {
    return (
        <div className={classnames(className, styles.sort)} {...props}>
            <div className={'hidden-element'} id={'sort'}>Сортировка</div>
            <button
                className={classnames(styles['sort-item'], {
                    [styles.active]: sort === SortEnum.Rating
                })}
                onClick={(): void => setSort(SortEnum.Rating)}
                aria-selected={sort === SortEnum.Rating}
                aria-labelledby={'sort rating'}
            >
                <SortIcon/><span id={'rating'}>По&nbsp;рейтингу</span>
            </button>
            <button
                className={classnames(styles['sort-item'], {
                    [styles.active]: sort === SortEnum.Price
                })}
                onClick={(): void => setSort(SortEnum.Price)}
                aria-selected={sort === SortEnum.Price}
                aria-labelledby={'sort price'}
            >
                <SortIcon/><span id={'price'}>По&nbsp;цене</span>
            </button>
        </div>
    );
};
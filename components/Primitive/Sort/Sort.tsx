import styles from './Sort.module.css';
import classnames from "classnames";
import {SortEnum, SortProps} from "./Sort.props";
import SortIcon from './sort.svg';

export const Sort = ({sort, setSort, className, ...props}: SortProps):JSX.Element => {
    return (
        <div className={classnames(className, styles.sort)} {...props}>
            <div
                className={classnames(styles['sort-item'], {
                    [styles.active]: sort === SortEnum.Rating
                })}
                onClick={(): void => setSort(SortEnum.Rating)}
            >
                <SortIcon/><span>По&nbsp;рейтингу</span>
            </div>
            <div
                className={classnames(styles['sort-item'], {
                    [styles.active]: sort === SortEnum.Price
                })}
                onClick={(): void => setSort(SortEnum.Price)}
            >
                <SortIcon/><span>По&nbsp;цене</span>
            </div>
        </div>
    );
};
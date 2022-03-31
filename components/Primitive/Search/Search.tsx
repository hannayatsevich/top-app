import {SearchProps} from "./Search.props";
import styles from './Search.module.css';
import classnames from "classnames";
import {Input, Button} from "../../../components";
import SearchIcon from '../../../public/help-icons/search.svg';
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {useRouter} from "next/router";

export const Search = ({className, ...props}: SearchProps):JSX.Element => {
    const [searchValue, setSearchValue] = useState<string>('');
    const router = useRouter();
    
    const goToSearch = (): void => {
        router.push({
            pathname: '/search',
            query: {
                q: encodeURI(searchValue)
            }
        });
    };

    return (
        <div className={classnames(className, styles.search)} {...props}>
            <Input
                className={styles.input}
                placeholder={'Поиск...'}
                onChange={(e: ChangeEvent<HTMLInputElement>): void => setSearchValue(e.target.value)}
                onKeyDown={(e:KeyboardEvent<HTMLInputElement>):void => {e.code === 'Enter' && goToSearch();}}
                value={searchValue}
            />
            <Button
                className={styles.button}
                onClick={goToSearch}
            >
                <SearchIcon/>
            </Button>
        </div>
    );
};
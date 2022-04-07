import classnames from "classnames";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {useRouter} from "next/router";
import Link from "next/link";
import SearchIcon from './search.svg';
import styles from './Search.module.css';
import {SearchProps} from "./Search.props";
import {Input, Button} from "@/components/index";

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
        <form className={classnames(className, styles.search)} {...props} role={'search'}>
            <Input
                className={styles.input}
                placeholder={'Поиск...'}
                onChange={(e: ChangeEvent<HTMLInputElement>): void => setSearchValue(e.target.value)}
                onKeyDown={(e:KeyboardEvent<HTMLInputElement>):void => {e.code === 'Enter' && goToSearch();}}
                value={searchValue}
                aria-label={'Введите строку поиска'}
            />
            <Link href={`/search?q=${encodeURI(searchValue)}`} >
                <a tabIndex={-1}>
                    <Button
                        className={styles.button}
                        aria-label={'Искать по сайту'}
                    >
                        <SearchIcon/>
                    </Button>
                </a>
            </Link>
        </form>
    );
};
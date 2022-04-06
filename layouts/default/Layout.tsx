import {LayoutProps} from "./Layout.props";
import {Header, Sidebar, Footer, Up} from "../../components";
import React, {FunctionComponent, useState, KeyboardEvent, useRef} from "react";
import styles from './Layout.module.css';
import {AppContextProvider, IAppContext} from "../../contexts/app.context";
import classnames from "classnames";

export const Layout: React.FC<LayoutProps> = ({children}) => {
    const mainRef = useRef<HTMLDivElement>(null);
    const [isSkipLinkVisible, setIsSkipLinkVisible] = useState<boolean>(false);
    
    const skipContentAction = (event: KeyboardEvent): void => {
        if(event.code === 'Enter' || event.code === 'Space') {
            event.preventDefault(); // иначе происходит скролл при нажатии space
            if(mainRef && mainRef.current) {
                mainRef.current.focus();
                setIsSkipLinkVisible(false);
            }
        }
        else {
            setIsSkipLinkVisible(false);
        }
    };

    return (
        <div className={styles['page-wrapper']}>
            <button
                tabIndex={0}
                className={classnames(styles['skip-link'], {
                    [styles['skip-link-visible']]: isSkipLinkVisible
                })}
                onFocus={ ():void => setIsSkipLinkVisible(true)}
                onKeyDown={skipContentAction}
            >Сразу к содержанию</button>
            <Header className={styles.header}/>
            <Sidebar className={styles.sidebar}/>
            <main className={styles.main} ref={mainRef} tabIndex={0} role={'main'}>
                {children}
            </main>
            <Footer className={styles.footer}/>
            <Up />
        </div>
    );
};

export const withLayout = <T extends Record<string, unknown> & IAppContext>(Component: FunctionComponent<T>) => {
    return function withLayoutComponent(props: T):JSX.Element {
        return (
            <AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
                <Layout>
                    <Component {...props}/>
                </Layout>
            </AppContextProvider>
        );
    };
};
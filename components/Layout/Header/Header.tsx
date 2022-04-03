import {HeaderProps} from "./Header.props";
import styles from './Header.module.css';
import classnames from "classnames";
import Logo from "../../../public/logo.svg";
import React, {useEffect, useState} from "react";
import {ButtonIcon} from "../../Primitive/ButtonIcon/ButtonIcon";
import {Sidebar} from "../Sidebar/Sidebar";
import {motion} from "framer-motion";
import {useRouter} from "next/router";

export const Header = ({className, ...props}: HeaderProps):JSX.Element => {
    const router = useRouter();
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const variants = {
        opened: {
            opacity: 1,
            x: 0,
            transition: {
                stiffness: 20
            }
        },
        closed: {
            opacity: 0,
            x: '100%',
            transition: {
                stiffness: 20
            }
        },
    };
    
    useEffect(() => {
        setIsOpened(false);
    }, [router]);

    return (
        <header className={classnames(className, styles.header)} {...props}>
            <Logo/>
            <ButtonIcon icon={'menu'} styleType={'white'} onClick={(): void => setIsOpened(true)}/>
            <motion.div
                className={styles['mobile-menu']}
                initial={isOpened ? 'opened' : 'closed'}
                animate={isOpened ? 'opened' : 'closed'}
                variants={variants}
            >
                <Sidebar/>
                <ButtonIcon icon={'close'} styleType={'white'} className={styles.close} onClick={(): void => setIsOpened(false)}/>
            </motion.div>
        </header>
    );
};
import styles from './Up.module.css';
import classnames from "classnames";
import {useScrollY} from "../../../hooks/useScrollY";
import {motion, useAnimation} from "framer-motion";
import {useEffect} from "react";
import {ButtonIcon} from "../ButtonIcon/ButtonIcon";

export const Up = ():JSX.Element => {
    const controls = useAnimation();
    const scrollY = useScrollY();

    const scrollTop = ():void => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        controls.start({
            opacity: scrollY / document.body.scrollHeight
        });
        
    }, [controls, scrollY]);

    return (
        <motion.div
            className={classnames(styles.up)}
            animate={controls}
            initial={{opacity: 0}}
        >
            <ButtonIcon icon={'up'} onClick={scrollTop}/>
        </motion.div>
    );
};
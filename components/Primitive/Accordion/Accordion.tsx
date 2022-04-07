import classnames from "classnames";
import {useEffect, useState} from "react";
import {motion, useReducedMotion} from "framer-motion";
import {AccordionProps} from "./Accordion.props";
import styles from './Accordion.module.css';
import ArrowIcon from "./arrow.svg";
import {Card} from "@/components/index";

export const Accordion = ({controllable = false, id, isOpened = false, setStatus, heading, children, className}: AccordionProps):JSX.Element => {
    const reducedMotion = useReducedMotion();
    const variants = {
        opened: {
            opacity: 1,
            height: 'auto',
            transition: {
                duration: 0.5
            }
        },
        closed: {
            opacity: reducedMotion ? 1: 0,
            height: 0,
            transition: {
                duration: 0.5
            }
        }
    };
    const [isAccordionOpened, setIsAccordionOpened] = useState<boolean>(isOpened);
    
    const handleChange = (): void => {
        if(!controllable) {
            setIsAccordionOpened(!isAccordionOpened);            
        }
        setStatus && setStatus(!isAccordionOpened, id);
    };
    
    useEffect(() => {
        if(controllable) {
            setIsAccordionOpened(isOpened);
        }
        
    }, [controllable, isOpened]);

    return (
        <Card className={classnames(className, styles.accordion)} color={'white'}>
            <button
                className={classnames(`${className}-heading`, styles.heading)}
                onClick={handleChange}
                aria-expanded={isAccordionOpened}
            >
                <span>{heading}</span>
                <span
                    className={classnames(styles.arrow, {
                        [styles['arrow-down']]: isAccordionOpened,
                        [styles['arrow-right']]: !isAccordionOpened
                    })}
                >
                    <ArrowIcon />
                </span>
            </button>
            <motion.div
                className={styles['content-wrapper']}
                variants={variants}
                initial={isAccordionOpened ? 'opened' : 'closed'}
                animate={isAccordionOpened ? 'opened' : 'closed'}
            >
                <div className={classnames(`${className}-content`, styles.content)}>
                    {children}
                </div>
            </motion.div>
        </Card>
    );
};
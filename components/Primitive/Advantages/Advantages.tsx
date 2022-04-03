import styles from './Advantages.module.css';
import classnames from "classnames";
import {AdvantagesProps} from "./Advantages.props";
import CheckIcon from "./check-green.svg";

export const Advantages = ({advantages, className, ...props}: AdvantagesProps):JSX.Element => {
    return (
        <div className={classnames(className, styles.advantages)} {...props}>
            {advantages.map(advantage => (
                <div key={advantage._id} className={styles.advantage}>
                    {
                        advantage.title && <>
                            <CheckIcon/>
                            <div className={styles['advantage-title']}>{advantage.title}</div>
                        </>
                    }
                    {
                        !!advantage.description && <>
                            <hr className={styles.divider}/>
                            <div className={styles['advantage-description']}>{advantage.description}</div>
                        </>
                    }
                </div>
            ))}
        </div>
    );
};